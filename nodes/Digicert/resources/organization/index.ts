import type { INodeProperties } from 'n8n-workflow';

const showOnlyForOrganization = {
	resource: ['organization'],
};

export const organizationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForOrganization,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many organizations',
				description: 'Get a list of organizations',
				routing: {
					request: {
						method: 'GET',
						url: '/organization',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an organization',
				description: 'Get details of a specific organization',
				routing: {
					request: {
						method: 'GET',
						url: '=/organization/{{$parameter.organizationId}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create an organization',
				description: 'Create a new organization',
				routing: {
					request: {
						method: 'POST',
						url: '/organization',
					},
				},
			},
			{
				name: 'Activate',
				value: 'activate',
				action: 'Activate an organization',
				description: 'Activate an organization',
				routing: {
					request: {
						method: 'PUT',
						url: '=/organization/{{$parameter.organizationId}}/activate',
					},
				},
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				action: 'Deactivate an organization',
				description: 'Deactivate an organization',
				routing: {
					request: {
						method: 'PUT',
						url: '=/organization/{{$parameter.organizationId}}/deactivate',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an organization',
				description: 'Delete an organization',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/organization/{{$parameter.organizationId}}',
					},
				},
			},
			{
				name: 'Submit for Validation',
				value: 'submitValidation',
				action: 'Submit organization for validation',
				description: 'Submit an organization for validation',
				routing: {
					request: {
						method: 'POST',
						url: '=/organization/{{$parameter.organizationId}}/validation',
					},
				},
			},
			{
				name: 'Get Validation Details',
				value: 'getValidation',
				action: 'Get validation details',
				description: 'Get validation details for an organization',
				routing: {
					request: {
						method: 'GET',
						url: '=/organization/{{$parameter.organizationId}}/validation',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['get', 'activate', 'deactivate', 'delete', 'submitValidation', 'getValidation'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the organization',
	},
	{
		displayName: 'Organization Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the organization',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Street address of the organization',
		routing: {
			send: {
				type: 'body',
				property: 'address',
			},
		},
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'City of the organization',
		routing: {
			send: {
				type: 'body',
				property: 'city',
			},
		},
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['create'],
			},
		},
		default: '',
		description: 'State/Province of the organization',
		routing: {
			send: {
				type: 'body',
				property: 'state',
			},
		},
	},
	{
		displayName: 'Zip',
		name: 'zip',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Postal/ZIP code of the organization',
		routing: {
			send: {
				type: 'body',
				property: 'zip',
			},
		},
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Country code (e.g., US, GB, CA)',
		routing: {
			send: {
				type: 'body',
				property: 'country',
			},
		},
	},
	{
		displayName: 'Telephone',
		name: 'telephone',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'Telephone number of the organization',
		routing: {
			send: {
				type: 'body',
				property: 'telephone',
			},
		},
	},
	{
		displayName: 'Validation Type',
		name: 'validationType',
		type: 'options',
		displayOptions: {
			show: {
				...showOnlyForOrganization,
				operation: ['submitValidation'],
			},
		},
		options: [
			{ name: 'OV', value: 'ov' },
			{ name: 'EV', value: 'ev' },
		],
		default: 'ov',
		required: true,
		description: 'Type of validation to submit for',
		routing: {
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
];
