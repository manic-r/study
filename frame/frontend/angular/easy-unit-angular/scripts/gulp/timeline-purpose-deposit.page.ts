timeline - purpose - deposit.page.ts

/**
 * getReservationAndTransactionList
 * @private
 * @memberof TimelinePurposeDepositPage
 */
private getReservationAndTransactionList(): void {
    this.timelinePurposeDepositService.retrieveSystemDate().subscribe(_ => {
        // これからの予定
        this.timelinePurposeDepositService.getAutoInnerTransferReservation(
            this.searchConditionQuery.getReservationRequestParam()
        );

        // これまでの履歴
        this.timelinePurposeDepositService.getPurposeDepositTransaction(
            this.searchConditionQuery.getTransactionRequestParam()
        );
    })
}

timeline - purpose - deposit.service.ts

private httpClient: HttpClient,
    private timelineSearchConditionService: TimelineSearchConditionService,
        protected timelineSearchConditionStore: TimelineSearchConditionStore

/**
   * Retrieveds system reference date.
   *
   * @returns {Observable<void>}
   * @memberof DateService
   */
  public retrieveSystemDate(): Observable < void> {
    return this.httpClient
        .get<RetrieveDateResponse>(environment.apiUrl.domesticPayment.systemDate)
        .pipe(
            tap(date => {
                const nowDateTimeStr: string = new Date().toISOString().replace(/^.{10}/, moment(date.systemDate).format('YYYY-MM-DD'));
                this.timelineSearchConditionService.updateBaseTime(new Date(nowDateTimeStr));
            }),
            mapTo(void 0),
            catchError(this.handleError(this.timelineSearchConditionStore))
        );
}

timeline - search - condition.service.ts
 /**
   * Update base time.
   *
   * @memberof TimelineSearchConditionService
   */
  public updateBaseTime(time: Date): void {
    this.store.update({
        ...this.store.getValue(),
        baseTime: time
    });
}


timeline - purpose - deposit.page.ts
/**
   * getReservationAndTransactionList
   * @private
   * @memberof TimelinePurposeDepositPage
   */
  private getReservationAndTransactionList(): void {
    this.timelinePurposeDepositService.retrieveSystemDate().subscribe(_ => {
        // これからの予定
        this.timelinePurposeDepositService.getAutoInnerTransferReservation(
            this.searchConditionQuery.getReservationRequestParam()
        );

        // これまでの履歴
        this.timelinePurposeDepositService.getPurposeDepositTransaction(
            this.searchConditionQuery.getTransactionRequestParam()
        );
    })
}


test / feature / 81154
