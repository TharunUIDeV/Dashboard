import {Injectable} from '@angular/core';
import {ConfigService} from '../service/config.service';
import {of} from 'rxjs/observable/of';
import {CaremarkDataService} from '../service/caremark-data.service';
import {fromPromise} from 'rxjs/observable/fromPromise';


@Injectable()
export class CdcHelperService {

  private sessionStorage = window.sessionStorage;
  private sessionData: any = {};
  private memberDetail: any = {};
  private memberList: any = [];
  private drugSearchResultCache: any = {};

  constructor(private configService: ConfigService,
              private caremarkDataService: CaremarkDataService) {
  }


  setSessionStorage (key, data) {
    try {
      if (typeof(Storage) !== 'undefined') {
        this.sessionStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.log(e);
    }

  }

  getSessionStorage (key) {
    try {
      if (typeof(Storage) !== 'undefined' && this.sessionStorage[key]) {
        return JSON.parse(this.sessionStorage[key]);
      }
    } catch (e) {
      console.log(e);
      return false;
    }
    return false;
  }

  /**
   * Check for mail or retail
   * @param drug
   * @param type
   * @returns {*|Number}
   */
  isMailOrRetail (drug, type) {
    const drugType = drug[type];
    if (drugType && drugType.ndcId) {
      return parseInt(drugType.ndcId, 10) > 0;
    }
    return false;
  }

  /**
   * getting the searched drug name
   * @param drug
   * @returns {string}
   */
  getDrugName(drug) {
    return drug.drugName.__cdata + ' ' + drug.drugStrength.__cdata + ' ' + drug.drugForm.__cdata;
  }

  /**
   * getting the searched drug name
   * @param drug
   * @returns {string}
   */
  getGenericName(drug) {
    if (drug.genericName) {
      return drug.genericName.__cdata + ' ' + drug.drugStrength.__cdata + ' ' + drug.drugForm.__cdata;
    }
  }


  /**
   * Checking for common dosage
   * @param drug
   * @param type
   * @returns {*|Number|string|boolean}
   */
  hasCommonDosageProperty(drug, type) {
    const drugType = drug[type];
    return (drugType && drugType.ndcId && parseInt(drugType.ndcId, 10)
      && drugType.commonDispensedQuantity && parseFloat(drugType.commonDispensedQuantity) > 0
      && drugType.commonDaysSupply && parseInt(drugType.commonDaysSupply, 10) > 0);
  }

  /**
   * Checking for common dosage
   * @param drugDetails
   * @param drug
   */
  hasCommonDosage(drug, drugDetails) {
    drug.isMail = this.isMailOrRetail(drug, 'mailDrug');
    drug.isRetail = this.isMailOrRetail(drug, 'retailDrug');

    if (drugDetails.isSolid) {
      if (drug.isMail && drug.isRetail) {
        drugDetails.dosageSelected.hasCommon = this.hasCommonDosageProperty(drug, 'mailDrug') &&
          this.hasCommonDosageProperty(drug, 'retailDrug');
      } else if (drug.isMail) {
        drugDetails.dosageSelected.hasCommon = this.hasCommonDosageProperty(drug, 'mailDrug');
      } else if (drug.isRetail) {
        drugDetails.dosageSelected.hasCommon = this.hasCommonDosageProperty(drug, 'retailDrug');
      }
    }
  }

  checkDosageDayForMail(drugDetails) {
    return (drugDetails.dosageSelected && drugDetails.dosageSelected.isCustom
      && drugDetails.dosageSelected.options && drugDetails.dosageSelected.options.days &&
      parseInt(drugDetails.dosageSelected.options.days, 10) < 16);
  }

  hasMailLessError(drugDetails) {
    let isMailLessError = false;
    drugDetails.isMail = this.isMailOrRetail(drugDetails, 'mailDrug');
    drugDetails.isMailLessError = false;

    if (drugDetails.isMail && this.checkDosageDayForMail(drugDetails)) {
      isMailLessError = true;
      drugDetails.isMail = false;
    }
    return isMailLessError;
  }

  /**
   * Getting data of searched drug
   * @param drug
   * @returns {{}}
   */
  getDrugData (drug) {
    const drugData: any = {};
    let genericInfo;
    if (drug) {
      const genericName = this.getGenericName(drug);
      if (genericName) {
        genericInfo = drug;
        /* Revisit
        responseList.forEach(function (storedNameValue) {
          if (this.getDrugName(storedNameValue).toLowerCase() === genericName.toLowerCase()) {
            genericInfo = storedNameValue;
          }
        });*/
      }

      const drugDetails = drug;
      drugDetails.isSolid = (drug.drugForm.__cdata.toLowerCase().indexOf('tablet') !== -1 ||
                            drug.drugForm.__cdata.toLowerCase().indexOf('capsule') !== -1);
      if (!drugDetails['dosageSelected']) {
        drugDetails['dosageSelected'] = {
          'hasCommon': true
        };
        this.hasCommonDosage(drug, drugDetails);
        if (drugDetails.hasCommon && genericInfo) {
          this.hasCommonDosage(genericInfo, drugDetails);
        }
        this.hasMailLessError(drugDetails);
      }

      drugData.drugName = this.getDrugName(drug);
      drugData.drugDetails = drugDetails;
    }

    return drugData.drugDetails;
  }

  setPharmacyDetail (pharmacy) {
    const pharmacyDetails: any = {};
    // const pharmacy = pharmacyInfo.pharmacy || pharmacyInfo;
    if (pharmacy && pharmacy.pharmacyName) {
      // pharmacyDetails = {};
      pharmacyDetails.pharmacyName = pharmacy.pharmacyName.__cdata ? pharmacy.pharmacyName.__cdata : pharmacy.pharmacyName;
      pharmacyDetails.address = pharmacy.address.__cdata ? pharmacy.address.__cdata : pharmacy.address;
      pharmacyDetails.city = pharmacy.city ? (pharmacy.city.__cdata ? pharmacy.city.__cdata : pharmacy.city) : '';
      pharmacyDetails.state = pharmacy.state;
      pharmacyDetails.zipCode = pharmacy.zipCode;
      pharmacyDetails.pharmacyId = pharmacy.pharmacyId || pharmacy.pharmacyNumber;
      pharmacyDetails.phoneNumber = pharmacy.phoneNumber;
      pharmacyDetails.npiNumber = pharmacy.npiNumber || '';
      pharmacyDetails.pharmacyPreferred = pharmacy.prefPharmInd || pharmacy.pharmacyPreferred; // For Preferred pharmacy feature
      pharmacyDetails.pharmacyLabel = pharmacy.pharmacyLabel || null;
      pharmacyDetails.pharmacyIndicator = pharmacy.pharmacyIndicator;
    }
    return pharmacyDetails;
  }

  setMemberDetails (memberInfo) {

    if (this.memberDetail) {
      this.memberDetail = Object.assign(memberInfo);
      if (memberInfo.addresses) {
        const address = memberInfo.addresses;
        this.memberDetail.memberAddress = {};
        this.memberDetail.memberAddress.line1 = address.line1 && address.line1.__cdata && address.line1.__cdata;
        this.memberDetail.memberAddress.city = address.city;
        this.memberDetail.memberAddress.state = address.state;
        this.memberDetail.memberAddress.zipCode = address.zipCode;
      }
      this.memberDetail.primary = memberInfo.primary;
      this.memberDetail.extranetUsr = memberInfo.extranetUsr && memberInfo.extranetUsr === 'true' ? true : false;
      this.memberDetail.clientCode = memberInfo.clientCode;
      this.memberDetail.clientName = memberInfo.clientName;

      if (memberInfo.internalParams && memberInfo.internalParams.personalizationId) {
        this.memberDetail.personalizationId = memberInfo.internalParams.personalizationId;
      }
      this.memberDetail.isFuturePlan = memberInfo.isFuturePlan && memberInfo.isFuturePlan === 'true';
      this.memberDetail.planEffectiveDate = memberInfo.planEffectiveDate;
    }
  }

  // Takes an OBJECT or STRING and wraps it in an array
  convertToArray = function (input) {
    let arr;

    if (Object.prototype.toString.call(input) === '[object Object]') {
      arr = [input];
    } else if (Object.prototype.toString.call(input) === '[object Array]') {
      arr = input;
    } else if (Object.prototype.toString.call(input) === '[object String]') {
      arr = [input];
    }

    return arr;
  };

  sortList(listToSort, sortKey) {
    const reA = /[^a-zA-Z]/g;
    const reN = /\d+(\.\d+)?/g;
    listToSort.sort(function (alpha, beta) {
      const a = alpha[sortKey],
        b = beta[sortKey];
      const aA = a.replace(reA, '');
      const bA = b.replace(reA, '');
      if (aA === bA) {
        const aN = a.match(reN) ? parseFloat(a.match(reN)[0]) : 0;
        const bN = b.match(reN) ? parseFloat(b.match(reN)[0]) : 0;
        return aN === bN ? 0 : aN > bN ? 1 : -1;
      } else {
        return aA > bA ? 1 : -1;
      }
    });
  }

  getDate(dateInput) {
    if (dateInput && (typeof dateInput === 'string' || dateInput instanceof String)) {
      dateInput = dateInput.toString();
      const t = dateInput.split(/[- T]/);
      return new Date(t[0], t[1] - 1, t[2]);
    } else if ( dateInput && (typeof dateInput === 'object' || dateInput instanceof Object)) {
      dateInput = dateInput.__text;
      const t = dateInput.split(/[- T]/);
      return new Date(t[0], t[1] - 1, t[2]);
    } else {
      return dateInput;
    }
  }

  /**
   * getting member list
   */
  setMemberList(memberInfo) {
    if (memberInfo) {
      const member = Object.assign(memberInfo);
      member.dateOfBirth = this.getDate(memberInfo.dateOfBirth);
      member.selected = true;
      member.sortKey = member.firstName + member.lastName;
      member.isVaccineEligibile = this.isVaccineEligibile(member);
      member.isBestPharmacy = this.isBestPharmacy(member);
      member.isPrefPharmacyEligibile = this.isPrefPharmacyEligibile(member);
      this.memberList.push(member);

      if (memberInfo.family && memberInfo.family.dependentList && memberInfo.family.dependentList.memberInfo) {
          const memberInfoList = this.convertToArray(memberInfo.family.dependentList.memberInfo);
          memberInfoList.forEach((element) => {
            element.isVaccineEligibile = this.isVaccineEligibile(element);
            element.isBestPharmacy = this.isBestPharmacy(element);
            element.dateOfBirth = this.getDate(element.dateOfBirth);
            element.sortKey = (element.firstName + element.lastName).toLowerCase();

            // ITPR016786 Aetna Digital Component Phase IIA
            // Only eligible dependent will be included in the list
            if (element.eligibility.eligible === 'true') {
              this.memberList.push(element);
            }
          });
          this.sortList(this.memberList, 'sortKey');
          this.memberList.sort(function (a, b) {
            return a.dateOfBirth - b.dateOfBirth;
          });
      }
    }
    return this.memberList;
  }

  /**
   * Check for availability of vaccine
   */
  isVaccineEligibile(data) {
    let isVaccineEligibile = false;
    if (data.eligibility &&
        data.eligibility.benefitPlanList &&
        data.eligibility.benefitPlanList.benefitPlan) {
          data.eligibility.benefitPlanList.benefitPlan.forEach( (benefitPlan) => {
            if (!isVaccineEligibile && benefitPlan.deliverySystem === '3') {
            isVaccineEligibile = benefitPlan.vaccineEligible;
            }
          });
    }
    return isVaccineEligibile;
  }

  /**
   * ITPR017648 Vishnu R: 09/15/2016
   * Added new funciton to check preferred pharmacy eligibility
   */

  isPreferredPharmacyActive(data: any) {

    let isPreferredPharmacyActive = false;

    if ( !isPreferredPharmacyActive &&
      data.eligibility &&
      data.eligibility.prefPharmInd &&
      data.eligibility.prefPharmInd === 'Y') {

      isPreferredPharmacyActive = true;
    } else if ( data.hasOwnProperty('prefPharmInd') && data.prefPharmInd === 'Y') {
      isPreferredPharmacyActive = true;
    }

    return isPreferredPharmacyActive;
  }

  /**
   * Check for availability of best pharmacy in pharmacy Search
   * @param data
   * @returns {boolean}
   */
  isBestPharmacy(data) {
    let isBestPharmacy = false;
    if (data.eligibility && data.eligibility.benefitPlanList && data.eligibility.benefitPlanList.benefitPlan) {
      data.eligibility.benefitPlanList.benefitPlan.forEach(  (benefitPlan) => {
        if (!isBestPharmacy && benefitPlan.deliverySystem === '3') {
          isBestPharmacy = (benefitPlan.mandatoryRetail90DaySupplyProgram && benefitPlan.mandatoryRetail90DaySupplyProgram === 'true') ||
                            (benefitPlan.retail90DaySupplyProgram && benefitPlan.retail90DaySupplyProgram === 'true') ||
                            (benefitPlan.maintenanceChoiceIndicator && benefitPlan.maintenanceChoiceIndicator === 'true');
        }
      });
    }
    return isBestPharmacy;
  }

  /**
   * Check for availability of pref pharmacy
   * @param data
   * @returns {boolean}
   */
  isPrefPharmacyEligibile(data) {
    let isPrefPharmEligibile = false;
    if (data.eligibility &&
      data.eligibility.prefPharmInd &&
      data.eligibility.prefPharmInd === 'Y') {
      isPrefPharmEligibile = true;
    } else if ( data.hasOwnProperty('prefPharmInd') && data.prefPharmInd === 'Y') {
      isPrefPharmEligibile = true;
    }
    return isPrefPharmEligibile;
  }

  transformTitleCase(input: string): string {
    if (!input) {
      return '';
    } else {
      return input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
    }
  }

  /**
   * Search for a drug
   * @param currentSearchkeyword
   * @returns {*|l.promise|{then, catch, finally}|d.promise|Function|promise}
   */
  drugSearch(currentSearchkeyword) {
    const savedKey = currentSearchkeyword.toLowerCase();
    let searchResultFromStorage;

    const sessionStoredData = this.getSessionStorage(this.configService.token);
    if (sessionStoredData) {
      searchResultFromStorage = sessionStoredData['drugSearchResultCache'];
    }
    if (searchResultFromStorage && searchResultFromStorage[savedKey]) {
      console.log('drugsearch: serving from cache');
      return of(searchResultFromStorage[savedKey]);
    }
    return fromPromise(this.caremarkDataService.getDrugByName(currentSearchkeyword));
  }

  cachedrugSearchResults(searchKey: string, result) {
    this.drugSearchResultCache[searchKey] = result;
    this.setSessionStorage(this.configService.token, {'drugSearchResultCache': this.drugSearchResultCache});
  }


  setSessionData(currentSearch) {
    this.sessionData.currentSearch = currentSearch;
    this.sessionData.loggedInUserInfo = this.memberDetail;
    this.sessionData.memberList = this.memberList;

    this.setSessionStorage(this.configService.token, this.sessionData);
  }

}
