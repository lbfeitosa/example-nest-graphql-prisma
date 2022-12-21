export const memoryUsage = () => {
  const formatMemoryUsage = (data: number) =>
    `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;
  const memoryData = process.memoryUsage();
  return (
    `heapTotal: ${formatMemoryUsage(memoryData.heapTotal)}, ` + // (total allocated heap)
    `heapUsed: ${formatMemoryUsage(memoryData.heapUsed)}, ` + // (actual memory used during the execution)
    `external: ${formatMemoryUsage(memoryData.external)}`
  ); //(V8 external memory)`;
};
