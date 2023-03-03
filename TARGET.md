link da lib de sugestão: https://github.com/rjsf-team/react-jsonschema-form

Exemplo de uso do plugin com condicional e env-inputs.

user@zup $ stk apply plugin microservice-springboot
? Qual linguagem deseja usar:
 » Java
 - Kotlin
? Qual versão do Java deseja usar:
 » 11
 - 17
? Project name: MyApp
? Package Name: io.zup
? Connection Pool by Env (Y/n): y
? Connection Pool (Dev): 10
? Connection Pool (Hom): 100
? Connection Pool (Prd): 1000
? Ecs task conn: (Use arrow keys)
 » ITI Cluster
   Itau Cluster
   Zup Cluster
? Https by Env (Y/n): n
? Https (Dev/Hom/Prd): true
Plugin Applied!
user@zup $

-----------------------------------------------------------------------

Exemplo do YAML desse plugin:

# yaml-language-server: $schema=./plugin-schema.json

#APP PLUGIN

stkApiVersion: stkframework.stackspot.com/v0.1
kind: app-plugin
metadata:
  name: microservice-springboot
  display-name: Microservice Springboot
  description: Microservice Java Springboot for ITI applications.
  version: 1.0.0
  owner: iti/foundation-team

spec:
  requires:
    - connection-interface: ecs-task-conn

  inputs:
    - label: Qual linguagem deseja usar?
      type: text
      name: language
      items:
        - Java
        - Kotlin
  
    - label: Qual versão do Java deseja usar?
      type: text
      name: java_version
      items:
        - "11"
        - "17"
      condition:
        variable: language
        operator: "=="
        value: Java
        
    - label: Qual versão do XPTO?
      type: text
      name: java_version_XPTO
      items:
        - "11"
        - "17"
      condition:
        variable: java_version
        operator: "=="
        value: Java
        
    - label: Qual versão do Kotlin deseja usar?
      type: text
      name: kotlin_version
      items:
        - 1.6
        - 1.7
      condition:
        variable: language
        operator: "=="
        value: Kotlin
      
    - label: Project Name
      type: text
      name: project-name

    - label: Package Name
      type: text
      name: package-name

  envs:
    - label: Connection Pool
      type: text
      name: connection-pool

    - label: Https
      type: bool
      name: http