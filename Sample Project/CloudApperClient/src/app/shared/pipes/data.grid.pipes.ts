import { Pipe, PipeTransform } from '@angular/core';
import { EnumUserInvitationStatus } from '@CloudApperClients/app-model';
import { isString } from 'lodash';

@Pipe({
    name: 'parseInvitationStatusText'
})
export class ParseInvitationStatusTextPipe implements PipeTransform {
    transform(dataFieldValue: number): string {
        let invitationStatusText = 'Not Sent';
        if (!dataFieldValue || dataFieldValue === EnumUserInvitationStatus.None) {
            invitationStatusText = 'Not Sent';
        } else if (dataFieldValue === EnumUserInvitationStatus.Sent) {
            invitationStatusText = 'Sent';
        } else if (dataFieldValue === EnumUserInvitationStatus.Accepted) {
            invitationStatusText = 'Accepted';
        } else if (dataFieldValue === EnumUserInvitationStatus.NeverSend) {
            invitationStatusText = 'Never Sent';
        } else if (dataFieldValue === EnumUserInvitationStatus.ReSend) {
            invitationStatusText = 'ReSend';
        }
        return invitationStatusText;
    }
}


@Pipe({
    name: 'parseMultiSelectTemplateText'
})
export class ParseMultiSelectTemplateText implements PipeTransform {
    transform(value: any): string {
        let multiSelectTemplateText = '';
        if (value && Array.isArray(value) && value.length) {
            multiSelectTemplateText = value.map(x => x).join(',');
        } else if (value && isString(value)) {
            multiSelectTemplateText = value.replace(/\;/g, ',');
        }
        return multiSelectTemplateText;
    }
}