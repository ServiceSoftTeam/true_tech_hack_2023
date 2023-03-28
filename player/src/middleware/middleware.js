export const middlewareGetPlayers = async (url) => {
	const serverData = {
		error: { isError: false, errorText: '' },
		data: [],
	};

	try {
		const devicesData = await fetch(url);
		serverData.data = await devicesData.json();
	} catch (error) {
		serverData.error.isError = true;
		serverData.error.errorText = error;
	}

	return serverData;
};