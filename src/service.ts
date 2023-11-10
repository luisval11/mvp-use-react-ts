export type Analysis = {
    id: string,
    period: string,
    resolution: string,
    presets: {
        key: string,
        fields: string[]
    }[],
    datasources: [],
    formulas: [],
    timeshifts: [],
    parent: { id: string, type: string },
}
// + Math.random() * 1000
const getForm = (presetKey: string) => new Promise<string>((resolve) => setTimeout(() => resolve(presetKey), 2000));

export const useGetParallelPresetForms = (analysis: Analysis): { promise: Promise<string[]> } => ({ promise: Promise.all(analysis.presets.map((preset) => getForm(preset.key))) })

const aw = async (analysis: Analysis) => {
    const tasks: Promise<string>[] = analysis.presets.map((preset) => getForm(preset.key));
    const results: string[] = [];
    for (const task of tasks) {
        console.time();
        results.push(await task);
        console.timeEnd();
    }

    return Promise.resolve(results)
}

export const useGetSequentialPresetForms = (analysis: Analysis): { promise: Promise<string[]>; } => ({ promise: aw(analysis) })
