// These templates are also used in lastpass-cli
export default [
	{
		name : 'American Express',
		shortname : 'amex',
		fields : [],
	},
	{
		name : 'Bank Account',
		shortname : 'bank',
		fields : [ 'Bank Name', 'Account Type', 'Routing Number', 'Account Number', 'SWIFT Code', 'IBAN Number', 'Pin', 'Branch Address', 'Branch Phone', ],
	},
	{
		name : 'Credit Card',
		shortname : 'credit-card',
		fields : [ 'Name on Card', 'Type', 'Number', 'Security Code', 'Start Date', 'Expiration Date', ],
	},
	{
		name : 'Database',
		shortname : 'database',
		fields : [ 'Type', 'Hostname', 'Port', 'Database', 'Username', 'Password', 'SID', 'Alias', ],
	},
	{
		name : 'Driver\'s License',
		shortname : 'drivers-license',
		fields : [ 'Number', 'Expiration Date', 'License Class', 'Name', 'Address', 'City / Town', 'State', 'ZIP / Postal Code', 'Country', 'Date of Birth', 'Sex', 'Height', ],
	},
	{
		name : 'Email Account',
		shortname : 'email',
		fields : [ 'Username', 'Password', 'Server', 'Port', 'Type', 'SMTP Server', 'SMTP Port', ],
	},
	{
		name : 'Health Insurance',
		shortname : 'health-insurance',
		fields : [ 'Company', 'Company Phone', 'Policy Type', 'Policy Number', 'Group ID', 'Member Name', 'Member ID', 'Physician Name', 'Physician Phone', 'Physician Address', 'Co-pay', ],
	},
	{
		name : 'Instant Messenger',
		shortname : 'im',
		fields : [ 'Type', 'Username', 'Password', 'Server', 'Port', ],
	},
	{
		name : 'Insurance',
		shortname : 'insurance',
		fields : [ 'Company', 'Policy Type', 'Policy Number', 'Expiration', 'Agent Name', 'Agent Phone', 'URL', ],
	},
	{
		name : 'Mastercard',
		shortname : 'mastercard',
		fields : [],
	},
	{
		name : 'Membership',
		shortname : 'membership',
		fields : [ 'Organization', 'Membership Number', 'Member Name', 'Start Date', 'Expiration Date', 'Website', 'Telephone', 'Password', ],
	},
	{
		name : 'Passport',
		shortname : 'passport',
		fields : [ 'Type', 'Name', 'Country', 'Number', 'Sex', 'Nationality', 'Date of Birth', 'Issued Date', 'Expiration Date', ],
	},
	{
		name : 'Server',
		shortname : 'server',
		fields : [ 'Hostname', 'Username', 'Password', ],
	},
	{
		name : 'Social Security',
		shortname : 'ssn',
		fields : [ 'Name', 'Number', ],
	},
	{
		name : 'Software License',
		shortname : 'software-license',
		fields : [ 'License Key', 'Licensee', 'Version', 'Publisher', 'Support Email', 'Website', 'Price', 'Purchase Date', 'Order Number', 'Number of Licenses', 'Order Total', ],
	},
	{
		name : 'SSH Key',
		shortname : 'ssh-key',
		fields : [ 'Bit Strength', 'Format', 'Passphrase', 'Private Key', 'Public Key', 'Hostname', 'Date', ],
	},
	{
		name : 'VISA',
		shortname : 'visa',
		fields : [],
	},
	{
		name : 'Wi-Fi Password',
		shortname : 'wifi',
		fields : [ 'SSID', 'Password', 'Connection Type', 'Connection Mode', 'Authentication', 'Encryption', 'Use 802.1X', 'FIPS Mode', 'Key Type', 'Protected', 'Key Index', ],
	},
]
