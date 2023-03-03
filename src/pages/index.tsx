import Head from 'next/head'
import useSWR from 'swr'
import styles from '@/styles/home.module.css'
import { load } from 'js-yaml'
import { DynamicForm } from '@/components/dynamic/form'
import { YamlInput } from '@/types/yaml-input'

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
  const { data, error } = useSWR('/api/staticdata', (url: string) => fetch(url).then((res) => res.json()))
  const yaml: YamlType | undefined = load(data) as YamlType | undefined

  return (
    <>
      <Head>
        <title>Dynamic YAML Forms - POC | StackSpot</title>
        <meta name="description" content="Creation of Dynamic Forms based on YAML configuration file" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <pre className={styles.yaml}><code>{data as string}</code></pre>
        <div>
          {yaml?.spec?.inputs ? <DynamicForm inputs={yaml.spec.inputs} /> : null}
          {yaml?.spec?.envs ? <DynamicForm inputs={yaml.spec.envs} /> : null}
        </div>
      </main>
    </>
  )
}
