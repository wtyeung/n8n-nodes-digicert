import type { INodeProperties } from 'n8n-workflow';

const showOnlyForOrder = {
	resource: ['order'],
};

export const orderDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForOrder,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many orders',
				description: 'Get a list of orders',
				routing: {
					request: {
						method: 'GET',
						url: '/order/certificate',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an order',
				description: 'Get details of a specific order',
				routing: {
					request: {
						method: 'GET',
						url: '=/order/certificate/{{$parameter.orderId}}',
					},
				},
			},
			{
				name: 'Order SSL Certificate',
				value: 'orderSSL',
				action: 'Order an SSL certificate',
				description: 'Order a new SSL/TLS certificate',
				routing: {
					request: {
						method: 'POST',
						url: '/order/certificate/ssl_plus',
					},
				},
			},
			{
				name: 'Duplicate Certificate',
				value: 'duplicate',
				action: 'Duplicate a certificate',
				description: 'Create a duplicate of an existing certificate',
				routing: {
					request: {
						method: 'POST',
						url: '=/order/certificate/{{$parameter.orderId}}/duplicate',
					},
				},
			},
			{
				name: 'Reissue Certificate',
				value: 'reissue',
				action: 'Reissue a certificate',
				description: 'Reissue an existing certificate',
				routing: {
					request: {
						method: 'POST',
						url: '=/order/certificate/{{$parameter.orderId}}/reissue',
					},
				},
			},
			{
				name: 'List Reissues',
				value: 'listReissues',
				action: 'List certificate reissues',
				description: 'List all reissues for an order',
				routing: {
					request: {
						method: 'GET',
						url: '=/order/certificate/{{$parameter.orderId}}/reissue',
					},
				},
			},
			{
				name: 'List Duplicates',
				value: 'listDuplicates',
				action: 'List certificate duplicates',
				description: 'List all duplicates for an order',
				routing: {
					request: {
						method: 'GET',
						url: '=/order/certificate/{{$parameter.orderId}}/duplicate',
					},
				},
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				action: 'Update order status',
				description: 'Update the status of an order',
				routing: {
					request: {
						method: 'PUT',
						url: '=/order/certificate/{{$parameter.orderId}}/status',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		displayOptions: {
			show: {
				...showOnlyForOrder,
				operation: ['get', 'duplicate', 'reissue', 'listReissues', 'listDuplicates', 'updateStatus'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the order',
	},
	{
		displayName: 'Certificate',
		name: 'certificate',
		type: 'json',
		displayOptions: {
			show: {
				...showOnlyForOrder,
				operation: ['orderSSL'],
			},
		},
		default: '{\n  "common_name": "example.com",\n  "dns_names": ["www.example.com"],\n  "csr": "",\n  "organization": {\n    "id": 0\n  },\n  "validity_years": 1\n}',
		required: true,
		description: 'Certificate order details in JSON format',
		routing: {
			send: {
				type: 'body',
				property: '',
			},
		},
	},
	{
		displayName: 'CSR',
		name: 'csr',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		displayOptions: {
			show: {
				...showOnlyForOrder,
				operation: ['duplicate', 'reissue'],
			},
		},
		default: '',
		required: true,
		description: 'Certificate Signing Request (CSR)',
		routing: {
			send: {
				type: 'body',
				property: 'certificate.csr',
			},
		},
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		displayOptions: {
			show: {
				...showOnlyForOrder,
				operation: ['updateStatus'],
			},
		},
		options: [
			{ name: 'Approved', value: 'approved' },
			{ name: 'Rejected', value: 'rejected' },
			{ name: 'Cancelled', value: 'cancelled' },
		],
		default: 'approved',
		required: true,
		description: 'The new status for the order',
		routing: {
			send: {
				type: 'body',
				property: 'status',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				...showOnlyForOrder,
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip',
				routing: {
					send: {
						type: 'query',
						property: 'offset',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Pending', value: 'pending' },
					{ name: 'Approved', value: 'approved' },
					{ name: 'Rejected', value: 'rejected' },
					{ name: 'Issued', value: 'issued' },
					{ name: 'Revoked', value: 'revoked' },
					{ name: 'Cancelled', value: 'cancelled' },
					{ name: 'Expired', value: 'expired' },
				],
				default: '',
				description: 'Filter by order status',
				routing: {
					send: {
						type: 'query',
						property: 'status',
					},
				},
			},
		],
	},
];
