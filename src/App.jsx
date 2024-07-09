import React, { useEffect } from "react";
import Routes from "utils/Routes";
import { initializeAxiosInterceptors } from "./utils/api";

const App = () => {
	useEffect(() => {
		initializeAxiosInterceptors();
	}, []);
	return (
		<>
			<Routes />
		</>
	);
};

export default App;
