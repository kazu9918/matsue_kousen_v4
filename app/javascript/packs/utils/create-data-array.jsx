export const CreateDataArray = (monitoringData) => {
    const monitoringDataArray = Object.entries(monitoringData).map((data) => data[1])
    .sort((previousData, rawData) => (previousData.recorded_at < rawData.recorded_at ? -1 : 1));
    return monitoringDataArray
}
