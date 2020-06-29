module.exports =
{
	server:
	{
		ssl: false,
		port:5000
	},
	database:
	{
		name: 'econobots',
		admin:
		{
			login: 'admin',
			password: 'admin',
			name: 'Administrator',
			profile: 'profile.admin'
		}
	},
	robot:
	{
		ip: '10.78.51.201',
		port:
		{
			rest: 40054,
			camera: 56480,
			camerathermique: 56381,
		},
		pilot:
		{
			name: 'econocom-platform-pilot',
			time: 600, // driving time for the pilot (s.)
			recordingTime: 120, // video recording time (s.)
			timeout: 10000 //inactivity timeout (ms.)
		}
	}
};
