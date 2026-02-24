import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCertificate = {
	resource: ['certificate'],
};

export const certificateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCertificate,
		},
		options: [
			{
				name: 'Download',
				value: 'download',
				action: 'Download a certificate',
				description: 'Download a certificate by certificate ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/certificate/{{$parameter.certificateId}}/download/format/{{$parameter.format || "pem_all"}}',
					},
				},
			},
			{
				name: 'Get Chain',
				value: 'getChain',
				action: 'Get certificate chain',
				description: 'Get the certificate chain',
				routing: {
					request: {
						method: 'GET',
						url: '=/certificate/{{$parameter.certificateId}}/chain',
					},
				},
			},
			{
				name: 'List Notes',
				value: 'listNotes',
				action: 'List certificate notes',
				description: 'List all notes for a certificate',
				routing: {
					request: {
						method: 'GET',
						url: '=/certificate/{{$parameter.certificateId}}/note',
					},
				},
			},
			{
				name: 'Add Note',
				value: 'addNote',
				action: 'Add a note to certificate',
				description: 'Add a note to a certificate',
				routing: {
					request: {
						method: 'POST',
						url: '=/certificate/{{$parameter.certificateId}}/note',
					},
				},
			},
			{
				name: 'Revoke',
				value: 'revoke',
				action: 'Revoke a certificate',
				description: 'Revoke a certificate',
				routing: {
					request: {
						method: 'PUT',
						url: '=/certificate/{{$parameter.certificateId}}/revoke',
					},
				},
			},
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive a certificate',
				description: 'Archive a certificate',
				routing: {
					request: {
						method: 'PUT',
						url: '=/certificate/{{$parameter.certificateId}}/archive',
					},
				},
			},
			{
				name: 'Restore',
				value: 'restore',
				action: 'Restore a certificate',
				description: 'Restore an archived certificate',
				routing: {
					request: {
						method: 'PUT',
						url: '=/certificate/{{$parameter.certificateId}}/restore',
					},
				},
			},
			{
				name: 'Email',
				value: 'email',
				action: 'Email a certificate',
				description: 'Email a certificate to specified addresses',
				routing: {
					request: {
						method: 'PUT',
						url: '=/certificate/{{$parameter.certificateId}}/email',
					},
				},
			},
		],
		default: 'download',
	},
	{
		displayName: 'Certificate ID',
		name: 'certificateId',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForCertificate,
				operation: ['download', 'getChain', 'listNotes', 'addNote', 'revoke', 'archive', 'restore', 'email'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the certificate',
	},
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		displayOptions: {
			show: {
				...showOnlyForCertificate,
				operation: ['download'],
			},
		},
		options: [
			{ name: 'PEM All', value: 'pem_all' },
			{ name: 'PEM', value: 'pem' },
			{ name: 'PEM No Root', value: 'pem_noroot' },
			{ name: 'Apache', value: 'apache' },
			{ name: 'NGINX', value: 'nginx' },
			{ name: 'P7B', value: 'p7b' },
			{ name: 'PFX', value: 'pfx' },
		],
		default: 'pem_all',
		description: 'The format to download the certificate in',
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				...showOnlyForCertificate,
				operation: ['addNote'],
			},
		},
		default: '',
		required: true,
		description: 'The note content to add',
		routing: {
			send: {
				type: 'body',
				property: 'note',
			},
		},
	},
	{
		displayName: 'Reason',
		name: 'reason',
		type: 'options',
		displayOptions: {
			show: {
				...showOnlyForCertificate,
				operation: ['revoke'],
			},
		},
		options: [
			{ name: 'Unspecified', value: 0 },
			{ name: 'Key Compromise', value: 1 },
			{ name: 'CA Compromise', value: 2 },
			{ name: 'Affiliation Changed', value: 3 },
			{ name: 'Superseded', value: 4 },
			{ name: 'Cessation of Operation', value: 5 },
		],
		default: 0,
		required: true,
		description: 'The reason for revoking the certificate',
		routing: {
			send: {
				type: 'body',
				property: 'reason',
			},
		},
	},
	{
		displayName: 'Email Addresses',
		name: 'emails',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForCertificate,
				operation: ['email'],
			},
		},
		default: '',
		required: true,
		description: 'Comma-separated list of email addresses to send the certificate to',
		routing: {
			send: {
				type: 'body',
				property: 'emails',
				preSend: [
					async function (this, requestOptions) {
						const emails = this.getNodeParameter('emails') as string;
						requestOptions.body = {
							emails: emails.split(',').map(e => e.trim()),
						};
						return requestOptions;
					},
				],
			},
		},
	},
];
