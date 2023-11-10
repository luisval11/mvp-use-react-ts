import { useEffect, useState } from 'react'
import './App.css'
import { Analysis, useGetParallelPresetForms, useGetSequentialPresetForms } from './service'
// import useSWR from 'swr';

const usePromise = <T extends object>(promise: Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const callback = async () => {
      setIsLoading(true);
      // console.time();
      const result = await promise;
      console.timeEnd();
      // console.log(result);
      setData(result);
      setIsLoading(false);
    };

    callback().catch((reason) => {
      setError(reason);
    })
  }, [])

  return { isLoading, data, error };
}

const defaultAnalysis: Analysis = {
  "id": "65437c3270d4614c756216f3",
  "period": "",
  "resolution": "",
  "presets": [
    {
      "key": "BY_PARAMETER_0",
      "fields": []
    },
    {
      "key": "BY_PARAMETER_1",
      "fields": []
    },
    {
      "key": "BY_PARAMETER_2",
      "fields": []
    }, {
      "key": "BY_PARAMETER_3",
      "fields": []
    }
  ],
  "datasources": [],
  "formulas": [],
  "timeshifts": [],
  "parent": {
    "id": "65437c3170d4614c756216f2",
    "type": "PRESET_PAGE"
  }
}

function App() {
  // const { promise } = useGetParallelPresetForms(defaultAnalysis);
  const { promise } = useGetSequentialPresetForms(defaultAnalysis);

  const { data, error, isLoading } = usePromise<string[]>(promise);
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <>
      {
        data?.map((preset) => {
          return <div key={preset}>{preset}</div>
        })
      }
    </>
  )
}

export default App
