import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDomain = {
	resource: ['domain'],
};

export const domainDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDomain,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many domains',
				description: 'Get a list of domains',
				routing: {
					request: {
						method: 'GET',
						url: '/domain',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a domain',
				description: 'Get details of a specific domain',
				routing: {
					request: {
						method: 'GET',
						url: '=/domain/{{$parameter.domainId}}',
					},
				},
			},
			{
				name: 'Activate',
				value: 'activate',
				action: 'Activate a domain',
				description: 'Activate a domain for use',
				routing: {
					request: {
						method: 'PUT',
						url: '=/domain/{{$parameter.domainId}}/activate',
					},
				},
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				action: 'Deactivate a domain',
				description: 'Deactivate a domain',
				routing: {
					request: {
						method: 'PUT',
						url: '=/domain/{{$parameter.domainId}}/deactivate',
					},
				},
			},
			{
				name: 'Submit for Validation',
				value: 'submitValidation',
				action: 'Submit domain for validation',
				description: 'Submit a domain for DCV validation',
				routing: {
					request: {
						method: 'POST',
						url: '=/domain/{{$parameter.domainId}}/validation',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Domain ID',
		name: 'domainId',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForDomain,
				operation: ['get', 'activate', 'deactivate', 'submitValidation'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the domain',
	},
	{
		displayName: 'DCV Method',
		name: 'dcvMethod',
		type: 'options',
		displayOptions: {
			show: {
				...showOnlyForDomain,
				operation: ['submitValidation'],
			},
		},
		options: [
			{ name: 'Email', value: 'email' },
			{ name: 'DNS TXT', value: 'dns-txt-token' },
			{ name: 'DNS CNAME', value: 'dns-cname-token' },
			{ name: 'HTTP Practical Demonstration', value: 'http-token' },
			{ name: 'HTTPS Practical Demonstration', value: 'https-token' },
		],
		default: 'email',
		description: 'Domain Control Validation method',
		routing: {
			send: {
				type: 'body',
				property: 'dcv_method',
			},
		},
	},
];
