import {Injectable} from '@angular/core';
import {MemberService} from './member.service';
import {CaremarkDataService} from './caremark-data.service';

@Injectable()
export class PlanSummaryService {
  private isMedicareMember = false;
  private isStcobMember = false;

  constructor(public memberInfoService: MemberService,
              public caremarkDataService: CaremarkDataService) { }

  getMedicareFromMemberInfo() {
    this.memberInfoService.getMemberDetails().then((memberInfo) => {
      const memberData: any = memberInfo;
      this.isMedicareMember = memberData.medicare;
      this.isStcobMember = memberData.stCob;
    });
  }

  getPlanSummaryData() {
    return this.caremarkDataService.getPlanSummary()
      .then((data) => {
        return data;
      });

  }

}
