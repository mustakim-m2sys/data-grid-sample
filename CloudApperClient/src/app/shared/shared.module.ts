import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { HelipopperModule } from '@ngneat/helipopper';
import { TranslocoModule } from '@ngneat/transloco';
import { QRCodeModule } from 'angularx-qrcode';
import { DxReportDesignerModule, DxReportViewerModule } from 'devexpress-reporting-angular';
import {
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownButtonModule,
  DxListModule,
  DxLookupModule,
  DxPopupModule,
  DxTabPanelModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxTooltipModule,
  DxTreeViewModule,
  DxValidationSummaryModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxFilterBuilderModule } from 'devextreme-angular/ui/filter-builder';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxiButtonModule, DxoValidationModule } from 'devextreme-angular/ui/nested';
import { DxRadioGroupModule } from 'devextreme-angular/ui/radio-group';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTagBoxModule } from 'devextreme-angular/ui/tag-box';
import { DxTileViewModule } from 'devextreme-angular/ui/tile-view';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { NgxPanZoomModule } from 'ngx-panzoom';

import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { AppIncompleteComponent } from './components/app-incomplete-popup/app.incomplete.component';
import { CALottieComponent } from './components/ca-lottie-animation/ca-lottie/ca-lottie.component';
import { ColumnChooserComponent } from './components/column-chooser/column-chooser.component';
import { CustomContentLoaderComponent } from './components/content-loader/content-loader.component';
import {
  ContentPlaceholderLoaderComponent,
} from './components/content-placeholder-loader/content-placeholder-loader.component';
import { DataGridLoaderComponent } from './components/data-grid-loader/data-grid.loader.component';
import { DotPulseLoaderComponent } from './components/dot-pulse-loader/dot.pulse.loader.component';
import { FormIncompleteComponent } from './components/form-incomplete-popup/form.incomplete.component';
import { GlobalLoaderComponent } from './components/global-loader/global.loader.component';
import { InlineMinLoaderComponent } from './components/inline-min-loader/inline.min.loader.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { FallbackImageDirective } from './directives/fallback.image.directive';
import { ParseInvitationStatusTextPipe, ParseMultiSelectTemplateText } from './pipes/data.grid.pipes';
import { DateDurationFormatterPipe } from './pipes/date-duration-formatter.pipe';
import { DateStringDurationFormatterPipe } from './pipes/date-string.duration.pipe';
import { EnumKeyWithLanguagePipe } from './pipes/EnumKeyWIthLanguage.pipe';
import { LanguageSplitPipe } from './pipes/language.split.pipe';
import { LocaleString } from './pipes/locale-string.pipe';
import { NameParserPipe } from './pipes/NameParser.pipe';
import { NiceDatePipe } from './pipes/nice-date.pipe';
import { RounderPipe } from './pipes/rounder.pipe';
import { RRuleTextPipe } from './pipes/rrule.pipe';
import { SafePipe } from './pipes/safe.pipe';

//export lottie player
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    LanguageSplitPipe,
    ParseInvitationStatusTextPipe,
    ParseMultiSelectTemplateText,
    SafePipe,
    NiceDatePipe,
    DateDurationFormatterPipe,
    DotPulseLoaderComponent,
    GlobalLoaderComponent,
    ProgressComponent,
    AppIncompleteComponent,
    FormIncompleteComponent,
    SvgIconComponent,
    CALottieComponent,
    CustomContentLoaderComponent,
    LocaleString,
    ColumnChooserComponent,
    DataGridLoaderComponent,
    ContentPlaceholderLoaderComponent,
    RounderPipe,
    InlineMinLoaderComponent,
    RRuleTextPipe,
    NameParserPipe,
    AlertMessageComponent,
    FallbackImageDirective,
    EnumKeyWithLanguagePipe,
    DateStringDurationFormatterPipe,
    FallbackImageDirective,
  ],
  imports: [
    CommonModule,
    DxLoadPanelModule,
    DxTileViewModule,
    DxTemplateModule,
    DxButtonModule,
    DxFilterBuilderModule,
    DxSelectBoxModule,
    DxRadioGroupModule,
    DxTagBoxModule,
    DxScrollViewModule,
    DxPopupModule,
    TranslocoModule,
    DxToolbarModule,
    RouterModule,
    DxDataGridModule,
    LottieModule.forRoot({ player: playerFactory, useCache: true }),
    ContentLoaderModule,
    HelipopperModule.forRoot(),
    DragDropModule,
    QRCodeModule,
    NgxPanZoomModule,
    DxTabPanelModule,
    DxTreeViewModule,
    DxDropDownButtonModule,
    DxLookupModule,
    DxListModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxButtonModule,
    DxTooltipModule,
    DxTextBoxModule,
    DxButtonModule,
    DxTagBoxModule,
    DxTextAreaModule,
    DxiButtonModule,
    DxDateBoxModule,
    DxReportViewerModule,
    DxReportDesignerModule,
    DxValidatorModule,
    DxValidationSummaryModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    LanguageSplitPipe,
    ParseInvitationStatusTextPipe,
    ParseMultiSelectTemplateText,
    SafePipe,
    NiceDatePipe,
    DateDurationFormatterPipe,
    DotPulseLoaderComponent,
    GlobalLoaderComponent,
    ProgressComponent,
    AppIncompleteComponent,
    FormIncompleteComponent,
    SvgIconComponent,
    CALottieComponent,
    CustomContentLoaderComponent,
    HelipopperModule,
    LocaleString,
    ColumnChooserComponent,
    QRCodeModule,
    DataGridLoaderComponent,
    ContentPlaceholderLoaderComponent,
    NgxPanZoomModule,
    RounderPipe,
    InlineMinLoaderComponent,
    RRuleTextPipe,
    NameParserPipe,
    AlertMessageComponent,
    FallbackImageDirective,
    EnumKeyWithLanguagePipe,
    DateStringDurationFormatterPipe,
    FallbackImageDirective,
  ],
  providers: [DatePipe]
})
export class SharedModule { }
