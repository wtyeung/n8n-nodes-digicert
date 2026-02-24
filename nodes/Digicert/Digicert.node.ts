import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';
import { certificateDescription } from './resources/certificate';
import { orderDescription } from './resources/order';
import { organizationDescription } from './resources/organization';
import { domainDescription } from './resources/domain';

export class Digicert implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Digicert',
		name: 'digicert',
		icon: { light: 'file:digicert.svg', dark: 'file:digicert.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Digicert API',
		defaults: {
			name: 'Digicert',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'digicertApi', required: true }],
		requestDefaults: {
			baseURL: 'https://www.digicert.com/services/v2',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Certificate',
						value: 'certificate',
					},
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Domain',
						value: 'domain',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'certificate',
			},
			...certificateDescription,
			...orderDescription,
			...organizationDescription,
			...domainDescription,
			...userDescription,
			...companyDescription,
		],
	};
}
