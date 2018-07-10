import {Injectable} from '@angular/core';
import {ConfigService} from '../service/config.service';
import * as CDCCurrentSearch from '../../assets/mock-data/mock-cdcsearch-data.json';
import {MemberService} from '../service/member.service';


@Injectable()
export class CdcHelperService {

  private sessionStorage = window.sessionStorage;
  private sessionData = {};

  constructor(private configService: ConfigService) {
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
    drug.isMail = this.isMailOrRetail(drug, "mailDrug");
    drug.isRetail = this.isMailOrRetail(drug, "retailDrug");

    if (drugDetails.isSolid) {
      if (drug.isMail && drug.isRetail) {
        drugDetails.dosageSelected.hasCommon = this.hasCommonDosageProperty(drug, "mailDrug") &&
          this.hasCommonDosageProperty(drug, "retailDrug");
      } else if (drug.isMail) {
        drugDetails.dosageSelected.hasCommon = this.hasCommonDosageProperty(drug, "mailDrug");
      } else if (drug.isRetail) {
        drugDetails.dosageSelected.hasCommon = this.hasCommonDosageProperty(drug, "retailDrug");
      }
    }
  }

  checkDosageDayForMail(drugDetails) {
    return (drugDetails.dosageSelected && drugDetails.dosageSelected.isCustom
      && drugDetails.dosageSelected.options && drugDetails.dosageSelected.options.days && parseInt(drugDetails.dosageSelected.options.days, 10) < 16)
  }

  hasMailLessError(drugDetails) {
    let isMailLessError = false;
    drugDetails.isMail = this.isMailOrRetail(drugDetails, "mailDrug");
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
        /*
        responseList.forEach(function (storedNameValue) {
          if (this.getDrugName(storedNameValue).toLowerCase() === genericName.toLowerCase()) {
            genericInfo = storedNameValue;
          }
        });*/
      }

      const drugDetails = drug;
      drugDetails.isSolid = (drug.drugForm.__cdata.toLowerCase().indexOf('tablet') !== -1 || drug.drugForm.__cdata.toLowerCase().indexOf('capsule') !== -1);
      if (!drugDetails["dosageSelected"]) {
        drugDetails["dosageSelected"] = {
          "hasCommon": true
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
      pharmacyDetails.city = pharmacy.city ? (pharmacy.city.__cdata ? pharmacy.city.__cdata : pharmacy.city): '';
      pharmacyDetails.state = pharmacy.state;
      pharmacyDetails.zipCode = pharmacy.zipCode;
      pharmacyDetails.pharmacyId = pharmacy.pharmacyId || pharmacy.pharmacyNumber;
      pharmacyDetails.phoneNumber = pharmacy.phoneNumber;
      pharmacyDetails.npiNumber = pharmacy.npiNumber || "";
      pharmacyDetails.pharmacyPreferred = pharmacy.prefPharmInd || pharmacy.pharmacyPreferred; // For Preferred pharmacy feature
      pharmacyDetails.pharmacyLabel = pharmacy.pharmacyLabel || null;
      pharmacyDetails.pharmacyIndicator = pharmacy.pharmacyIndicator;
    }
    return pharmacyDetails;
  }



  setSessionData(currentSearch) {
    this.sessionData['currentSearch'] = currentSearch;
    this.setSessionStorage(this.configService.token, this.sessionData);
  }

}
