import Head from 'next/head'
import useSWR from 'swr'
import styles from '@/styles/home.module.css'
import { load } from 'js-yaml'
import { DynamicForm } from '@/components/raw-dynamic-form'
import CitricDynamicForm from '@/components/citric-forms/FormDynamic'
import { YamlInput } from '@/types/yaml-input'
import { useState } from 'react'
import ThemeProvider from '@/components/theme-provider'

interface YamlType {
  kind?: string
  metadata?: any
  spec?: {
    envs?: YamlInput[]
    inputs?: YamlInput[]
    requires?: any
    stkApiVersion?: string
  }
}

export default function Home() {
  const [formData, setFormData] = useState<any>(null)
  const [formDataCitric, setFormDataCitric] = useState<any>(null)
  const { data, error } = useSWR('/api/staticdata', (url: string) => fetch(url).then((res) => res.json()))
  const yaml: YamlType | undefined = load(data) as YamlType | undefined
  const formInputs = [
    ...(yaml?.spec?.inputs || []),
    ...(yaml?.spec?.envs || []),
  ]

  return (
    <>
      <Head>
        <title>Dynamic YAML Forms - POC | StackSpot</title>
        <meta name="description" content="Creation of Dynamic Forms based on YAML configuration file" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <main className={styles.main}>
          <pre className={styles.yaml}>
            <code>{data as string}</code>
          </pre>
          <div className={styles.form}>
            <h1>RAW Dynamic YAML Form</h1>
            {formInputs && formInputs.length ? <DynamicForm inputs={formInputs} submitText="Create application" onSubmit={setFormData} /> : null}
            {formData ? <pre>{JSON.stringify(formData, null, 2)}</pre> : null}
            <br></br><br></br><br></br><br></br>
            <h1>Citric + StackSpot Dynamic YAML Form</h1>
            {formInputs && formInputs.length ? <CitricDynamicForm name="citric-form-name" inputs={formInputs} onSubmit={setFormDataCitric} /> : null}
            {formDataCitric ? <pre>{JSON.stringify(formDataCitric, null, 2)}</pre> : null}
          </div>
        </main>
      </ThemeProvider>
    </>
  )
}
