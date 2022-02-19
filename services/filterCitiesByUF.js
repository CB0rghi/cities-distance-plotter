const citiesByUF = (cities, UF) => {
	return cities.filter((city) => (
		city.cd_uf === UF
	))
}

export default citiesByUF