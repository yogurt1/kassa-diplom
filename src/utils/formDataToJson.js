const formDataToJson = (formData) => JSON.stringify(
    Array.from(
        formData.entries()
    )
        .reduce((acc, entry) => {
            acc[entry[0]] = entry[1];
            return acc;
        }, {})
);

export default formDataToJson;