import { Injectable } from '@angular/core';
import {CaremarkDataServiceInterface} from './caremark-data.service.interface';

import {HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';


@Injectable()
export class IceSdkService implements CaremarkDataServiceInterface {
  iceURL = 'https://icet-sit3.caremark.com/Services/icet/getRxStatusSummary?version=7.0&serviceName=getRxStatusSummary&operationName=getRxStatusSummary&appName=ICE_WEB&channelName=MOBILE&deviceType=DESKTOP&deviceToken=7777&lineOfBusiness=ICE&xmlFormat=False&apiKey=c69e906f-5c23-4be8-be73-d43527cece5b&source=CMK_WEB';

  payload =
    {"request":{"tokenID":"asjajvixNelcAeJhqcIyDrAf6OGwPAjCxKZ8KbI4C%2BzmFhE2vuXbHxyjAKIRHXhX%2FH7Aw7zdGW94itKGdivQE0BMR%2Fqk5xt1zibX8fcsSoD1xz61Q3LVkiZrUxdTs3tpTePez2UDJiNSlaFkzFYNa6pTvJIFR4osOFfywuPPf7H7eGX5ZccU4Y1IDK%2FI9Ex6y4114wHekzZ1IfWYWoSCG%2FzFBz0tcTXLt38WraNuwJc9Zq3rpT3qBeMwuHKm88mk0zkheBwY82TuwEZZjjurG5VpGKs8D%2B2B6mZycamdYjwEgAg6oyafy4VTD9uYS9mbtH0lSoDXyq6%2FAZhJK46zJhyRh4DpGP6G%2FXv3OYMaBjoOzaZRmKnbUba%2FyNr0SmkboDH1Rk%2BKfr%2BFcjMs3evsnRG%2BKXJ9wTiKJXWLcffRU1c0A2s3Kne2LuGHsWYQu3AIvW0vLxuL6k7vdK1hwZFNiNuEIdZVtilYICu7unuBchbKNS0uDGjPqXOWjHNw60%2FdKf%2FufznpMCZUEChdsp2hsF8Yuzv8b4gSV%2B8bYrsUHDMfAhX0q4nDhDNPK58MMGuK%2BCahKCiE3%2BZCM%2FKFyQztYeraSXshZDvynntV37qJ%2FJpYL%2FNOlxDEoNCZSXaPn7UvK2gX9JgSaKxFAHFDmvKC2GEEhQh2OsJAnh9uXuTiWMp1AF1FVtd%2FNLzH2HdOCvzedEmXWTjrDuik2f3vy8%2BMMhGdVJ4BH5zCnnOiGhjQj77QErLshqdrMF9ftcYlRZoFbQTuwf1OSEznCHmk60xO9D9dGT3exlCDykaBATD0e%2BLpCYIstjQvUXupiVD2AiahzU1spO7fkkqL%2FgZ9lQ3Uyt4j17%2FxfZ9Ycf4VtM6W0mQc9dx62c6rg2earDMdMz9kjp7g5ni4ny4oqKyu11DGIVmr323r29YDn1wlWJ55pRsDF2kvfDpng9%2BCYLrv2mwRxER%2F4c8BebSBx6197ZL5k%2BlKaaS%2FVhbp55Lp2IqnkEkdKyl8TVVE3Q3th71FUxwCxmY%2BbxQxU8dnzSBjNZEA6a3GTZ%2FjYf4zEYDbmNjQjYQWoOClM5jk6YwWy0VAh1el4OXdKcqdktRp4hKGd4tqNWO4dzr3lVWSu6VBDCI7r1J3yCZ4%2FtFCqvdZVYOWSS2z5xZcfv%2FnEXxaUm8NV13d4bshutQ%2F9DCPtQp%2FCNr%2FgxOC%2ByhM3ehgryt9ZgIcLA4ILidel2a6LzhDPMPeaciFZoXaHPFwmILkHYsXQFpcsZbOgPhAbLwGxDm%2BZ3U6kI1cwl%2BJk831L80PWiReI6DlFKmJF%2Bp%2FFcWdP8BZX70djoyP4juak4FeM7Yfgosf%2FLOtenQSbZ9BR%2F2Z8a30bMdrEQn2nlXSHHXt6j70LACANaRVFi2VRuGSI0lLoirDSP9y2R3dyxggaNH6pGoNKbHNvogFWxWLJ58NAibjEZkzX5OP0us%2FxDbiVb9Qdsiw214WNJB3dSuf1Ta6oeY8sb76K1uz%2B1JYhlBr6oOb%2F%2FDhpDzWjcLRXcA7pZF3B%2B%2Fyzb0rNybvPqTiTy6j21UHp1TaB6iXg3O7%2FVQ%2BrHMyaqWi%2FH20vbdgcIBg5fvf%2B2PbRXel69PXnkOllqDwtUbuIVHJaW1Xz9CFf24u%2Be44IUp04upvM92D6KhHketdWXvmtVydjfoHSPXmmTxFd4cZ%2BosKUqGxRE9xWN3r%2FMjZqdw2Mn39vjvw5zcXtxS0cuvZmmcwWBi1ChThmcJLncay1JUXykUPH6YBCnmNI1tfNXM%2FtH%2B%2F%2FUCU09Sv68Y8M2fYQcPUmryJgJ1BL3va%2B7URThCW41LyK85eU4b7F8J5M11ahcXVGAMEHKP01PClozDUdnqQILVe591ioPbmxioslsnDW3icu23vmcA67lIUwfp%2FgWFKg879d8UEJxb%2BpZ8oitdaj%2F8M4vpxLfbbegobZqiHzYZtE1FJ8LaVkX9PydR%2F231Sao3PUo49vPbTc%2F7wqXDucbz06fPt%2FuC0aqzfqfS%2FWev8Wde%2FIWFkQATw3Ny0URcgKDHZQtauH%2BikH1hIwtXxDwCKzBc2WO26YxFMH8aFkoJ0OOCMPCWyNV006mc0lDf9CYSZO2uanh%2BqL3PeeJGw3Ob3AnU%2FGJcOhMLiR%2FqnDVXX2QPfaV8PrHoaYv%2F0j17i2PfOspDOpP0GsR9qQOV5Q3YXIsCo9VSpJjoh7hkXC%2B3nYIJLKFDreKRhIp%2FFC8seySncQYT0ulJTcOzoIur7QXH1AH%2BMfEnMj3NRBYdgSCAYC3ujzoJmcplRic%2Fu853%2FaQrS%2FUZYPwSEeYgCpc23rBkcCmSVJUDE%2BkSjSMyvTBl9eCjhCBH6nBUIdb%2Fi8NGurN%2B2R6JkQeR%2BVVN3lL836FUemBwo5tYVKw26AVMEjP6LmZziYWPDjQsIpJF4ea1CWPuVsybkdsXrJKrBJzOXTZXB2hku%2B7dHjx5eREfue1M6G%2FnfRWGkDLItrVOK0nd3VX2318jX%2FoiZ5oQS6XiornGAf9nf7sxIu2UiemlOq2uFzDDKz87AiXwmvRFilwoc0ShDNRrtn5y%2FH47tNGZtytFOniuET4sL6YQKrjzCDy8vdtVhbY8eQ5gAr2gTWiiVL4DVsck9K0O48elbWfXd%2BmKx61vpWDJ18iY4bxo9y8awcAWjnZzlgdC18WBGMRxEtSfH0ruZJicoPVmP9%2BVluLEHryL12vZM5dJC2zwdfnxKbjludK8gDHvzeqr5%2FLngE0LPMuPnURwarjndHQuDdg21yisyTM2wdJUqbxEHavzXSmfBf3tHAruxYQaJ5UXiYyaLIvkwFLrLfl5PXW5z9ZVtx45wNtvQiPzIs0zgQgOFywknlPb9cIhgICR1sg2poM9XHd9TdBHaQt9ENQwOmP%2F0SuO5OQmZSucVE2RM3wpU9XOebZkP09JhB9Jwqm1Tg6QX4Rn0BlqV9gszpZBnNBGa481PnyKRB%2BdymtmA5JTkkz6eZz65wwyS3IVOpWhg2Fzy1vZuGyVa5ABBEudtyx%2BL6GvRlX%2FIT%2F8i%2FPJwYzEhfCTkbq1p6Xjtgb%2BoN%2FeUR5SqqV5Bsw8Q8bu17Tl3S1U0t4NDKrH2iegAqPDVPTn0Q1iFQEXciHvXiSSZ6Ckq9tpq%2FbotZvUbklLn%2Fl4Rx7lYkhClEyJieokFDDtrLI5SJWUA96ftEjmosXb4mnkwCrdmqS6x%2BI4vOTwFb%2B0c08uOpoPJnaOxq6tLgOygxJX3lIAoTMu3S7XyQyxr%2Bpi8g3QoIAg6n7VJ9BjfW1i99H2cBh%2BvuEkhIGib6MwDDAo1vHeya35MpdhcspgB67S8VIpuG%2BQhgdYnBf5yZXVa2oEnd0CGjJXhXebqEuhX%2FbUWCdJkwlmg%2F5urcJKFXnaO1GYKg%2FkKd5fpTexJ0Y1cjvAjfL0Wpl%2F58PEY2vwWkMtlMbwarTFUahL3K5KVYy9xHk%2F%2Bmi%2B1qrwCmeXr4fR%2F09LPpsjpr4EeRou4qMlOXQb4iyo403Vq2JY8NGJIQWJmltDBTaiLsui19q9aXYD4OoH4bDrcpOhSSRRZ16qU2IbVBr89WkK%2B1kYC%2BmhaRClq%2FDvL9tIFiqWmgTopLJoR1EIEcGkpZYP4wo5B0%2Bz2zHW4HUNSBnFk4D8stq0ttxmwu%2FhXnz%2F%2FTKDGOiusZA8bHW2G3WcJdQx8bIzTbnBAPW7rn%2FsGWNUBSja3vEaqcGq6JCgC%2BNJQ%2BEcxQejQV%2BL3GGOInGoIvgWRACoxbmU9VvHvdHP68FOFjSvTC7LJdIeKpvnalPQdJ%2BYowbRGbSzFFlekDXhNMOKvbJWtxTkNjKiHb3lq8wSSH%2FGjnQB4nCHlzkHWMl7ot3U2%2FYDIuGet2ftrUuUzeWK0tdoNZIESrwrqVfMirYJlZORHcpmk%2FbYexGHQ7tPVmQ954Nw3xH2jczEDfQCMzdBlZ8y9EN5cQn9%2FVj8HKZzt2JrOoRgUftrJiL6MjeCvREjI%2Fnfmzfsk%2BIudrCg8md13AknNDBrxbzSJT9amrBRkiSw0byAdQTNF35DycbnTc9WC7r0MXX4rHhboLQr3tEYti42NmnKgFlkgrFKAR7M0oYbCcxz8UWdflLheyKZTD4LImYKHwJdVlAyZ7iWhm4ENBHRTdbk1%2BsCr05HZXHdnUB9Yx0W4zu5EFCCjv7WuzU9G6IQNk2UkWRoqv%2B5Ls4x5NQjkBcoaXz%2FRKrrkVVR5YCd%2BT7emnYrLGsXCVm3KNX1usTMlj%2BfCLd0aw2%2Fa6AhL2w736sW0EYE%2BNMeHUD8eFU%2FCEX4CztrytegeokTKL64%2BJ%2Fd37eQBGHLtGgAL1AhfLhsbGq3L6xeELTtirK%2BoQznAykZ1frLFsYX17KbYXOfbLTIM4OPg%2BjzEokgcMyz%2FRHV7iTo8wmpVmRUFDFkyDyU6P74BaMdt5v%2BsQpo8vusC3Q6a91j2LlQzmb31wEbHkZirevImuF%2BWxN9W1DxfI1SEzOnmTyaR%2FiMHc7TiooR4iDZaTxWCl6TejEJskSKxt37YCNz6jvV52DrcSgjxtkBaMmfM9s7xrQsQuxaiDARbuy6EMTxssBjGTTxraXJ%2F7mtAS6JWxBAUo0x3jEw0a6Cx2J%2FS5l6uaMgFZ9czPr8aSRTIJDfORVBTuJx4UikM72uICg1qw6%2B5IgtFLIrUoil%2BF4hrFZmEa4OMF%2BPiszQoJr%2BnPuq5Z2lqC%2FlR3kBtvwP8rXHh09OlIFpYgrlAqanN9Y1f%2BQd6DAtS6Gb2pc6afn2qHww6hg3DK8JmFJ6h3CN%2FaY6SkueoZe%2BgC0o5kFuMMdli3oEx%2BIHEEmdbY2w0hBG707cu7fZ5FUAZ3g6UsvADfWos73Lg7%2FMaHbM9gYQCsabEQyHk3Hrn%2FSadSIH0AiSKD7wq2TqepCmsAdLBEp0Hslzh5bnGSWR1X5OqyXNbH%2BNTVSIZeZ8r3%2F3yU13aDBuxYr7Lu5%2BAKChbJLjuZmyw2Z2NUujRys%2Fk1WJY7SpB1r8TCxoUbUaKe%2BQNLJgL%2BPyssbaSTLh71cQLLve51n9SUjBFL%2F8kk5CymFubsSFYNItd4BhSlgFMTSGv9djE6txhMWg2KMcpBFo3Skq6KCAjk5peUjrR80WGF1sw2Ukp0UxQUH6K56rd4d5cL8l1rpcjCCwg%2FRgocVm3Y4sX8mGVXpxavIQ7QRffL9mQxB9cit1qLS5MyhbXpZTYu7i7xznIcPphCkUKd5bGcu8M1FsFQQzpqCYwauldx4j5qYtieWdXB%2F9XjOdz5rdGiScI4siiA3%2BBGu7iAVoCRrhYRP%2BVVIyRT5%2BM6yj60AAGWL3iyZ9f1jKqRDzRznzNkXGajldjjn%2BORQV2T0%2BGOE774UbR7kIEV3rUXtkIojxkxAuJQUcZ72oHq%2FQCDWzL0W4w%2BBzxhn8X9C8EO8FFYl0oYJE0ujsveg%3D%3D","prescriptionHistoryInfo":{"consumerKey":"c69e906f-5c23-4be8-be73-d43527cece5b","scriptSyncEligIndicator":"Y","startDate":"2017-11-16","systemIdentifier":"ICE","endDate":"2018-05-16","statusSummary":"Y","financialSummary":"N","estimateDrugCost":"Y","includeCompetitorRx":"Y","includeFillHistory":"Y"}}};


  constructor(private http: HttpClient) { }


  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return Observable.throw(res.error || 'Server error');
  }

  private getRefillsObserve(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'env': 'QA4',
        'operation': 'getRxStatusSummary',
      })};

    return this.http.post<any>(this.iceURL, this.payload, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMemberDetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
    });
  }

  getOrderStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject('Not implemented yet');
    });
  }

  getRefills(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRefillsObserve().subscribe((result) => {
        if (result.Header.StatusCode === '0000') {
          return resolve(result.detail.prescriptionHistoryDetails);
        }
        console.error(JSON.stringify(result.Header));
        return reject(result.Header);
      });
    });
  }

}
