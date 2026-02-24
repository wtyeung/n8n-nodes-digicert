import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DigicertApi implements ICredentialType {
	name = 'digicertApi';

	displayName = 'Digicert API';

	documentationUrl = 'https://dev.digicert.com/certcentral-apis/services-api/';

	icon = { light: 'file:digicert.svg', dark: 'file:digicert.dark.svg' };

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-DC-DEVKEY': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.digicert.com/services/v2',
			url: '/user',
		},
	};
}
