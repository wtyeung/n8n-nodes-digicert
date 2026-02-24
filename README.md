# n8n-nodes-digicert

This is an n8n community node. It lets you use DigiCert CertCentral API in your n8n workflows.

DigiCert is a leading certificate authority and provider of TLS/SSL certificates, code signing certificates, and other PKI solutions for securing digital communications and transactions.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following resources and operations:

### Certificate
- **Download** - Download a certificate by ID in various formats (PEM, Apache, NGINX, P7B, PFX)
- **Get Chain** - Get the certificate chain for a certificate
- **List Notes** - List all notes attached to a certificate
- **Add Note** - Add a note to a certificate
- **Revoke** - Revoke a certificate with a specified reason
- **Archive** - Archive a certificate
- **Restore** - Restore an archived certificate
- **Email** - Email a certificate to specified addresses

### Order
- **Get Many** - Get a list of certificate orders
- **Get** - Get details of a specific order
- **Order SSL Certificate** - Order a new SSL/TLS certificate
- **Duplicate Certificate** - Create a duplicate of an existing certificate
- **Reissue Certificate** - Reissue an existing certificate
- **List Reissues** - List all reissues for an order
- **List Duplicates** - List all duplicates for an order
- **Update Status** - Update the status of an order

### Organization
- **Get Many** - Get a list of organizations
- **Get** - Get details of a specific organization
- **Create** - Create a new organization
- **Activate** - Activate an organization
- **Deactivate** - Deactivate an organization
- **Delete** - Delete an organization
- **Submit for Validation** - Submit an organization for OV/EV validation
- **Get Validation Details** - Get validation details for an organization

### Domain
- **Get Many** - Get a list of domains
- **Get** - Get details of a specific domain
- **Activate** - Activate a domain
- **Deactivate** - Deactivate a domain
- **Submit for Validation** - Submit a domain for DCV validation

## Credentials

To use this node, you need a DigiCert CertCentral API key.

### Getting your API Key

1. Log in to your [DigiCert CertCentral account](https://www.digicert.com/account/login.php)
2. Navigate to **Account** > **API Keys**
3. Click **Create API Key**
4. Give your API key a descriptive name
5. Set the appropriate permissions for the key
6. Copy the generated API key

### Setting up credentials in n8n

1. In n8n, go to **Credentials** > **New**
2. Search for "DigiCert API"
3. Paste your API key in the **API Key** field
4. Click **Save**

## Compatibility

Tested with n8n version 1.0.0 and above.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [DigiCert CertCentral API Documentation](https://dev.digicert.com/certcentral-apis/services-api/)
* [DigiCert Certificate API](https://dev.digicert.com/certcentral-apis/services-api/certificates.html)
* [DigiCert Workflows](https://dev.digicert.com/certcentral-apis/services-api/workflows.html)

## Version history

### 0.1.0
- Initial release
- Support for Certificate operations (download, revoke, archive, restore, notes, email)
- Support for Order operations (list, get, create SSL, duplicate, reissue)
- Support for Organization operations (list, create, activate, validate)
- Support for Domain operations (list, activate, validate)
