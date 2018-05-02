import {Inject, Injectable} from '@angular/core';


@Injectable()
export class RefillService  {

   private param = {
    'env': 'SIT1',
    'apiKey': '769c71df-fd85-4645-92e0-b8003a8a4ef3',
    'apiSecret': '764588f5-551e-4894-b401-13ad2d61c1cf',
    'tokenId': '44E10BF8517F3C788CDDDD24A26740E9',
    'memberInfo': {
      'accountBalance': '0.0',
      'accountID': 'TDMACC',
      'addresses': {
        'city': 'RICHARDSON',
        'country': '0',
        'line1': '125 COIT RD',
        'line2': '',
        'sequenceNumber': '0',
        'state': 'TX',
        'zipCode': '75025'
      },
      'benefactorClientInternalID': '16',
      'cardholderInternalID': '789695522',
      'carrierID': '7434',
      'clientCode': 'MRK',
      'clientId': '16',
      'clientName': 'CVS CAREMARK',
      'clientPlanGroup': {
        'billingReportingCode': 'MRK',
        'cpgGroupCode': '001',
        'cpgGroupExtensionCode': '',
        'cpgID': '994990385',
        'cpgPlanCode': 'TDMACC',
        'cpgPlanExtensionCode': ''
      },
      'coverageEffectiveDate': '2001-01-01T00:00:00-06:00',
      'coverageTerminationDate': '2020-12-31T00:00:00-06:00',
      'dateOfBirth': '1964-02-02T00:00:00-06:00',
      'eisName': 'rxclaim',
      'eligibility': {
        'benefitPlanList': {
          'benefitPlan': [
            {
              'active': 'true',
              'apcsMailBenefit': 'false',
              'brandCopay': '50.0',
              'deliverySystem': '2',
              'effective': '2001-01-01T00:00:00-06:00',
              'expiration': '2020-12-31T00:00:00-06:00',
              'formularyId': '0',
              'mailOrderPharmacy': 'MTP',
              'mandatoryRetail90DaySupplyProgram': 'false',
              'planBenefitId': '226638',
              'retail90DaySupplyProgram': 'false',
              'vaccineEligible': 'false'
            },
            {
              'active': 'false',
              'apcsMailBenefit': 'false',
              'brandCopay': '0.0',
              'deliverySystem': '1',
              'effective': '2001-01-01T00:00:00-06:00',
              'expiration': '2020-12-31T00:00:00-06:00',
              'formularyId': '0',
              'mandatoryRetail90DaySupplyProgram': 'false',
              'planBenefitId': '0',
              'retail90DaySupplyProgram': 'false',
              'vaccineEligible': 'false'
            },
            {
              'active': 'true',
              'apcsMailBenefit': 'false',
              'brandCopay': '50.0',
              'deliverySystem': '3',
              'effective': '2001-01-01T00:00:00-06:00',
              'expiration': '2020-12-31T00:00:00-06:00',
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
        'enrolledAutoRefill': '2',
        'enrolledAutoRenew': '2',
        'prefPharmInd': 'Y',
        'providerClientIdentifier': '0',
        'proximityNetworkInd': 'false',
        'statusAutoRefill': '1',
        'statusAutoRenew': '1'
      },
      'emailAddress': 'erios@sit1.com',
      'externalID': 'SR148750102',
      'extranetUsr': 'false',
      'family': {
        'cardholderId': '789695522',
        'dependentList': {
          'memberInfo': [
            {
              'accountBalance': '0.0',
              'accountID': 'TDMACC',
              'addresses': {
                'city': 'RICHARDSON',
                'country': '0',
                'line1': '125 COIT RD',
                'line2': '',
                'sequenceNumber': '0',
                'state': 'TX',
                'zipCode': '75025'
              },
              'benefactorClientInternalID': '16',
              'cardholderInternalID': '789695522',
              'carrierID': '7434',
              'clientCode': 'MRK',
              'clientId': '16',
              'clientName': 'CVS CAREMARK',
              'clientPlanGroup': {
                'billingReportingCode': 'MRK',
                'cpgGroupCode': '001',
                'cpgGroupExtensionCode': '',
                'cpgID': '994990385',
                'cpgPlanCode': 'TDMACC',
                'cpgPlanExtensionCode': ''
              },
              'coverageEffectiveDate': '2001-01-01T00:00:00-06:00',
              'coverageTerminationDate': '2020-12-31T00:00:00-06:00',
              'dateOfBirth': '1999-08-01T00:00:00-05:00',
              'eisName': 'rxclaim',
              'eligibility': {
                'benefitPlanList': {
                  'benefitPlan': [
                    {
                      'active': 'true',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '50.0',
                      'deliverySystem': '2',
                      'effective': '2001-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
                      'formularyId': '0',
                      'mandatoryRetail90DaySupplyProgram': 'false',
                      'planBenefitId': '226638',
                      'retail90DaySupplyProgram': 'false',
                      'vaccineEligible': 'false'
                    },
                    {
                      'active': 'false',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '0.0',
                      'deliverySystem': '1',
                      'effective': '2001-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
                      'formularyId': '0',
                      'mandatoryRetail90DaySupplyProgram': 'false',
                      'planBenefitId': '0',
                      'retail90DaySupplyProgram': 'false',
                      'vaccineEligible': 'false'
                    },
                    {
                      'active': 'true',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '50.0',
                      'deliverySystem': '3',
                      'effective': '2001-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
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
                'csAreaCode': '',
                'csPhoneNumber': '',
                'eligible': 'true',
                'enrolledAutoRefill': '0',
                'enrolledAutoRenew': '0',
                'prefPharmInd': 'Y',
                'providerClientIdentifier': '0',
                'proximityNetworkInd': 'false',
                'statusAutoRefill': '0',
                'statusAutoRenew': '0'
              },
              'externalID': 'SR148750103',
              'firstName': 'JAKE',
              'gender': '1',
              'groupID': '001',
              'hideIneligibleDependent': 'false',
              'internalID': '789695524',
              'lastName': 'RIOS',
              'linkedInternalID': '0',
              'lockedOut': 'false',
              'medBEligible': 'false',
              'medicare': 'false',
              'middleName': '',
              'nceCode': '0',
              'personCode': '03',
              'primary': 'false',
              'providerClientId': '0',
              'qlMail': 'true',
              'registered': 'false',
              'relationShipCode': '3',
              'securityOptions': {
                'linkedParticipantId': '789695523',
                'viewMyOrders': 'true',
                'orderMyRefills': 'true',
                'viewMyPrescriptionHistory': 'true',
                'viewSensitiveMedicationsAllowed': 'true',
                'fastStart': 'true',
                'viewPriorAuthorizationStatus': 'false',
                'requestMyCoverageException': 'false',
                'viewMinorSensitiveMedicationsBlocked': 'false'
              },
              'stCob': 'false'
            },
            {
              'accountBalance': '0.0',
              'accountID': 'TDMACC',
              'addresses': {
                'city': 'RICHARDSON',
                'country': '0',
                'line1': '125 COIT RD',
                'line2': '',
                'sequenceNumber': '0',
                'state': 'TX',
                'zipCode': '75025'
              },
              'benefactorClientInternalID': '16',
              'cardholderInternalID': '789695522',
              'carrierID': '7434',
              'clientCode': 'MRK',
              'clientId': '16',
              'clientName': 'CVS CAREMARK',
              'clientPlanGroup': {
                'billingReportingCode': 'MRK',
                'cpgGroupCode': '001',
                'cpgGroupExtensionCode': '',
                'cpgID': '994990385',
                'cpgPlanCode': 'TDMACC',
                'cpgPlanExtensionCode': ''
              },
              'coverageEffectiveDate': '2006-01-01T00:00:00-06:00',
              'coverageTerminationDate': '2020-12-31T00:00:00-06:00',
              'dateOfBirth': '2005-09-10T00:00:00-05:00',
              'eisName': 'rxclaim',
              'eligibility': {
                'benefitPlanList': {
                  'benefitPlan': [
                    {
                      'active': 'true',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '50.0',
                      'deliverySystem': '2',
                      'effective': '2006-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
                      'formularyId': '0',
                      'mandatoryRetail90DaySupplyProgram': 'false',
                      'planBenefitId': '226638',
                      'retail90DaySupplyProgram': 'false',
                      'vaccineEligible': 'false'
                    },
                    {
                      'active': 'false',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '0.0',
                      'deliverySystem': '1',
                      'effective': '2006-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
                      'formularyId': '0',
                      'mandatoryRetail90DaySupplyProgram': 'false',
                      'planBenefitId': '0',
                      'retail90DaySupplyProgram': 'false',
                      'vaccineEligible': 'false'
                    },
                    {
                      'active': 'true',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '50.0',
                      'deliverySystem': '3',
                      'effective': '2006-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
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
                'csAreaCode': '',
                'csPhoneNumber': '',
                'eligible': 'true',
                'enrolledAutoRefill': '0',
                'enrolledAutoRenew': '0',
                'prefPharmInd': 'Y',
                'providerClientIdentifier': '0',
                'proximityNetworkInd': 'false',
                'statusAutoRefill': '0',
                'statusAutoRenew': '0'
              },
              'externalID': 'SR148750104',
              'firstName': 'ROSS',
              'gender': '2',
              'groupID': '001',
              'hideIneligibleDependent': 'false',
              'internalID': '789695525',
              'lastName': 'RIOS',
              'linkedInternalID': '0',
              'lockedOut': 'false',
              'medBEligible': 'false',
              'medicare': 'false',
              'middleName': '',
              'nceCode': '0',
              'personCode': '04',
              'primary': 'false',
              'providerClientId': '0',
              'qlMail': 'true',
              'registered': 'false',
              'relationShipCode': '3',
              'securityOptions': {
                'linkedParticipantId': '789695523',
                'viewMyOrders': 'false',
                'orderMyRefills': 'false',
                'viewMyPrescriptionHistory': 'false',
                'viewSensitiveMedicationsAllowed': 'false',
                'fastStart': 'false',
                'viewPriorAuthorizationStatus': 'false',
                'requestMyCoverageException': 'false',
                'viewMinorSensitiveMedicationsBlocked': 'false'
              },
              'stCob': 'false'
            },
            {
              'accountBalance': '0.0',
              'accountID': 'TDMACC',
              'addresses': {
                'city': 'RICHARDSON',
                'country': '0',
                'line1': '125 COIT RD',
                'line2': '',
                'sequenceNumber': '0',
                'state': 'TX',
                'zipCode': '75025'
              },
              'benefactorClientInternalID': '16',
              'cardholderInternalID': '789695522',
              'carrierID': '7434',
              'clientCode': 'MRK',
              'clientId': '16',
              'clientName': 'CVS CAREMARK',
              'clientPlanGroup': {
                'billingReportingCode': 'MRK',
                'cpgGroupCode': '001',
                'cpgGroupExtensionCode': '',
                'cpgID': '994990385',
                'cpgPlanCode': 'TDMACC',
                'cpgPlanExtensionCode': ''
              },
              'coverageEffectiveDate': '2001-01-01T00:00:00-06:00',
              'coverageTerminationDate': '2020-12-31T00:00:00-06:00',
              'dateOfBirth': '1960-01-01T00:00:00-06:00',
              'eisName': 'rxclaim',
              'eligibility': {
                'benefitPlanList': {
                  'benefitPlan': [
                    {
                      'active': 'true',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '50.0',
                      'deliverySystem': '2',
                      'effective': '2001-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
                      'formularyId': '0',
                      'mailOrderPharmacy': 'MTP',
                      'mandatoryRetail90DaySupplyProgram': 'false',
                      'planBenefitId': '226638',
                      'retail90DaySupplyProgram': 'false',
                      'vaccineEligible': 'false'
                    },
                    {
                      'active': 'false',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '0.0',
                      'deliverySystem': '1',
                      'effective': '2001-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
                      'formularyId': '0',
                      'mandatoryRetail90DaySupplyProgram': 'false',
                      'planBenefitId': '0',
                      'retail90DaySupplyProgram': 'false',
                      'vaccineEligible': 'false'
                    },
                    {
                      'active': 'true',
                      'apcsMailBenefit': 'false',
                      'brandCopay': '50.0',
                      'deliverySystem': '3',
                      'effective': '2001-01-01T00:00:00-06:00',
                      'expiration': '2020-12-31T00:00:00-06:00',
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
                'prefPharmInd': 'Y',
                'providerClientIdentifier': '0',
                'proximityNetworkInd': 'false',
                'statusAutoRefill': '0',
                'statusAutoRenew': '0'
              },
              'externalID': 'SR148750101',
              'firstName': 'ROSS',
              'gender': '1',
              'groupID': '001',
              'hideIneligibleDependent': 'false',
              'internalID': '789695522',
              'lastName': 'RIOS',
              'linkedInternalID': '0',
              'lockedOut': 'false',
              'medBEligible': 'false',
              'medicare': 'false',
              'middleName': '',
              'nceCode': '0',
              'personCode': '01',
              'primary': 'false',
              'providerClientId': '0',
              'qlMail': 'true',
              'registered': 'false',
              'relationShipCode': '1',
              'securityOptions': {
                'linkedParticipantId': '789695523',
                'viewMyOrders': 'false',
                'orderMyRefills': 'false',
                'viewMyPrescriptionHistory': 'false',
                'viewSensitiveMedicationsAllowed': 'false',
                'fastStart': 'false',
                'viewPriorAuthorizationStatus': 'false',
                'requestMyCoverageException': 'false',
                'viewMinorSensitiveMedicationsBlocked': 'false'
              },
              'stCob': 'false'
            }
          ]
        },
        'migrated': 'false'
      },
      'firstName': 'EMMA',
      'isFuturePlan': 'false',
      'gender': '2',
      'groupID': '001',
      'guestRefillOptedOut': 'false',
      'hideIneligibleDependent': 'false',
      'internalID': '789695523',
      'internalParams': {
        'personalizationId': '3003'
      },
      'lastLoginTimestamp': '2018-05-02T14:24:12.378-05:00',
      'lastName': 'RIOS',
      'linkedInternalID': '0',
      'lockedOut': 'false',
      'medBEligible': 'false',
      'medicare': 'false',
      'middleName': '',
      'nceCode': '0',
      'personCode': '02',
      'planEffectiveDate': '2014-09-01T00:00:00-05:00',
      'primary': 'true',
      'providerClientId': '13627',
      'qlMail': 'true',
      'registered': 'true',
      'registrationOptedOut': 'false',
      'relationShipCode': '2',
      'stCob': 'false',
      'underAgeMinor': 'false',
      'userNotRegisteredStatusCode': '0000',
      'userNotRegisteredStatusDescription': 'Success',
      'userRegistered': '01'
    }
  };
  public getRefills() {

    if (!this.sdkInstance) {
      return Error('SDK Not Initialized');
    }

    this.sdkInstance.Drug.getRefills(this.param, function (result) {
        console.log(JSON.stringify(result));
        return result;
    });
  }

  constructor(@Inject('CAREMARKSDK_INSTANCE') private sdkInstance: any) {}


}
