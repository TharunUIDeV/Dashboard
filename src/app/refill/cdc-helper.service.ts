import {Injectable} from '@angular/core';
import {ConfigService} from '../service/config.service';


@Injectable()
export class CdcHelperService {

  private sessionStorage = window.sessionStorage;
  private sessionData = {};

  constructor(private configService: ConfigService) {
    this.sessionData['currentSearch'] = {
      'drugDetails': {
        'displayText': 'Lipitor 40mg Tablet',
        'dosageSelected': {
          'hasCommon': true
        },
        'drugForm': {
          '__cdata': 'TABLET'
        },
        'drugName': {
          '__cdata': 'LIPITOR'
        },
        'drugStrength': {
          '__cdata': '40MG'
        },
        'genericName': {
          '__cdata': 'ATORVASTATIN CALCIUM'
        },
        'isMail': true,
        'isMailLessError': false,
        'isRetail': true,
        'isSolid': true,
        'mailDrug': {
          'brand': 'true',
          'commonDaysSupply': '90',
          'commonDispensedQuantity': '90.0',
          'deaClassCode': '0',
          'gpiCode': '39400010100330',
          'maintenance': 'true',
          'ndcId': '71015723',
          'nhu': '1',
          'orangeCode': 'AB',
          'orangeDesc': {
            '__cdata': 'PRODUCTS MEETING NECESSARY BIOEQUIVALENCE REQUIREMENTS.'
          },
          'packageSize': '90.0',
          'speciality': 'false',
          'status': 'O'
        },
        'retailDrug': {
          'brand': 'true',
          'commonDaysSupply': '90',
          'commonDispensedQuantity': '90.0',
          'deaClassCode': '0',
          'gpiCode': '39400010100330',
          'maintenance': 'true',
          'ndcId': '71015723',
          'nhu': '1',
          'orangeCode': 'AB',
          'orangeDesc': {
            '__cdata': 'PRODUCTS MEETING NECESSARY BIOEQUIVALENCE REQUIREMENTS.'
          },
          'packageSize': '90.0',
          'speciality': 'false',
          'status': 'O'
        },
        'sortKey': 'lipitor tablet 40mg'
      },
      'drugName': 'LIPITOR 40MG TABLET',
      'pharmacy': {
        'address': '1110 COTTONWOOD LANE',
        'city': 'IRVING',
        'npiNumber': '1073712329',
        'pharmacyId': '4545298',
        'pharmacyLabel': null,
        'pharmacyName': 'BOARDWALK PHARMACY',
        'pharmacyPreferred': 'N',
        'phoneNumber': '972-812-7559',
        'state': 'TX',
        'zipCode': '75038'
      },
      'userName': {
        'accountBalance': '0.0',
        'accountID': {
          '__cdata': 'GLDSOFM        '
        },
        'addresses': {
          'city': 'SAN ANTONIO',
          'country': '0',
          'line1': {
            '__cdata': '7034 ALAMO DOWNS PARKWAY'
          },
          'line2': '',
          'sequenceNumber': '0',
          'state': 'TX',
          'zipCode': '78238'
        },
        'aetnaClient': 'false',
        'benefactorClientInternalID': '16',
        'cardholderInternalID': '489050016',
        'carrierID': '7434',
        'clientCode': 'MRK',
        'clientId': '16',
        'clientName': '<![CDATA[CVS CAREMARK]]>',
        'clientPlanGroup': {
          'billingReportingCode': '<![CDATA[MRK]]>',
          'cpgGroupCode': '<![CDATA[CMKEE]]>',
          'cpgGroupExtensionCode': '<![CDATA[]]>',
          'cpgID': '6959309',
          'cpgPlanCode': '<![CDATA[GLDSOFM]]>',
          'cpgPlanExtensionCode': '<![CDATA[]]>'
        },
        'coverageEffectiveDate': '2008-09-05T00:00:00-05:00',
        'coverageTerminationDate': '2039-12-31T00:00:00-06:00',
        'dateOfBirth': '1961-01-17T06:00:00.000Z',
        'eisName': 'rxclaim',
        'eligibility': {
          'benefitPlanList': {
            'benefitPlan': [
              {
                'active': 'true',
                'apcsMailBenefit': 'false',
                'brandCopay': '41.5',
                'deliverySystem': '2',
                'effective': '2008-09-05T00:00:00-05:00',
                'expiration': '2039-12-31T00:00:00-06:00',
                'formularyId': '0',
                'mailOrderPharmacy': 'MTP',
                'mandatoryRetail90DaySupplyProgram': 'false',
                'planBenefitId': '226638',
                'retail90DaySupplyProgram': 'false',
                'vaccineEligible': 'false'
              },
              {
                'active': 'true',
                'apcsMailBenefit': 'false',
                'brandCopay': '0.0',
                'deliverySystem': '1',
                'effective': '2008-09-05T00:00:00-05:00',
                'expiration': '2039-12-31T00:00:00-06:00',
                'formularyId': '0',
                'mandatoryRetail90DaySupplyProgram': 'false',
                'planBenefitId': '-666',
                'retail90DaySupplyProgram': 'false',
                'vaccineEligible': 'false'
              },
              {
                'active': 'true',
                'apcsMailBenefit': 'false',
                'brandCopay': '0.0',
                'deliverySystem': '3',
                'effective': '2008-09-05T00:00:00-05:00',
                'expiration': '2039-12-31T00:00:00-06:00',
                'formularyId': '0',
                'maintenanceChoiceIndicator': 'false',
                'mandatoryRetail90DaySupplyProgram': 'false',
                'planBenefitId': '-666',
                'retail90DaySupplyProgram': 'false',
                'vaccineEligible': 'false'
              }
            ]
          },
          'coverageType': '0',
          'csAreaCode': '866',
          'csPhoneNumber': '2849226',
          'eligible': 'true',
          'enrolledAutoRefill': '0',
          'enrolledAutoRenew': '0',
          'prefPharmInd': 'N',
          'providerClientIdentifier': '0',
          'proximityNetworkInd': 'false',
          'statusAutoRefill': '0',
          'statusAutoRenew': '0'
        },
        'emailAddress': '<![CDATA[CMKTEST3@cvshealth.com]]>',
        'encInternalID': '%2BFQn6pxQ%2Bq%2B5U9y6BVN3kJqCmrA193eI755R%2BURlnY4%3D',
        'externalID': 'MRKPLAN101',
        'extranetUsr': 'false',
        'family': {
          'cardholderId': '489050016',
          'migrated': 'false'
        },
        'firstName': 'PAUL',
        'gender': '1',
        'groupID': {
          '__cdata': 'CMKEE          '
        },
        'hideIneligibleDependent': 'false',
        'internalID': '489050016',
        'internalParams': {
          'personalizationId': '3003'
        },
        'isBestPharmacy': false,
        'isFuturePlan': 'false',
        'isPrefPharmacyEligibile': false,
        'isVaccineEligibile': 'false',
        'lastName': 'ROBINETTE',
        'linkedInternalID': '0',
        'lockedOut': 'false',
        'mchoicePharmacy': {
          'address': '<![CDATA[65 CENTRAL ST]]>',
          'city': '<![CDATA[WELLESLEY]]>',
          'pharmacyId': '2229688',
          'pharmacyName': '<![CDATA[CVS PHARMACY 00363]]>',
          'phoneNumber': '',
          'prcsTypeCode': 'MCHOICE',
          'state': 'MA',
          'zipCode': '02482'
        },
        'medBEligible': 'false',
        'medicare': 'false',
        'middleName': '',
        'nceCode': '0',
        'personCode': '01',
        'planEffectiveDate': '2014-09-01T00:00:00-05:00',
        'preferredPharmacy': {
          'address': '<![CDATA[1110 COTTONWOOD LANE]]>',
          'city': '<![CDATA[IRVING]]>',
          'pharmacyId': '4545298',
          'pharmacyName': '<![CDATA[BOARDWALK PHARMACY]]>',
          'phoneNumber': '',
          'prcsTypeCode': 'PRIMARY',
          'state': 'TX',
          'zipCode': '75038'
        },
        'primary': 'false',
        'providerClientId': '0',
        'qlMail': 'true',
        'registered': 'true',
        'relationShipCode': '1',
        'retailPharmacy': {
          'address': '<![CDATA[7230 PRESTON RD]]>',
          'city': '<![CDATA[FRISCO]]>',
          'pharmacyId': '4589404',
          'pharmacyName': '<![CDATA[CVS PHARMACY 07751]]>',
          'phoneNumber': '',
          'prcsTypeCode': 'RETAIL',
          'state': 'TX',
          'zipCode': '75034'
        },
        'selected': true,
        'sortKey': 'PAULROBINETTE',
        'stCob': 'false',
        'userNotRegisteredStatusCode': '0000',
        'userNotRegisteredStatusDescription': 'Success',
        'userRegistered': '01'
      }
    };
  }

  setSessionStorage = function (key, data) {
    try {
      if (typeof(Storage) !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.log(e);
    }

  };

  getSessionStorage = function (key) {
    try {
      if (typeof(Storage) !== 'undefined' && sessionStorage[key]) {
        return JSON.parse(sessionStorage[key]);
      }
    } catch (e) {
      console.log(e);
      return false;
    }
    return false;
  };

  setSessionData() {
    this.setSessionStorage(this.configService.token, this.sessionData);
  }

}
