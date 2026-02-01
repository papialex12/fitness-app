# **Arquitectura del Ecosistema Operativo de Alto Rendimiento: Diseño Definitivo del Hub Central para Alex Aguirre**

## **1\. Fundamentos Teóricos y Visión Estratégica del Sistema**

El desarrollo de un sistema de gestión de entrenamiento para un perfil atleta-ejecutivo con características neurodivergentes requiere trascender la concepción tradicional de una hoja de cálculo. No estamos diseñando un simple repositorio de series y repeticiones; estamos arquitectando un **Sistema de Soporte a la Decisión (DSS)** bio-psico-social. Para Alex Aguirre, un empresario en el sector de la inteligencia artificial, estudiante universitario y exjugador de rugby, el recurso más escaso no es la fuerza, sino la "capacidad de ancho de banda cognitivo". El sistema propuesto, denominado "Hub Operativo", debe funcionar como un exoesqueleto digital que asuma la carga ejecutiva de la programación, permitiendo al usuario centrarse puramente en la ejecución física de alto nivel.

### **1.1 El Desafío de la Periodización Híbrida en Contextos de Alta Demanda Cognitiva**

La periodización híbrida, entendida como la búsqueda simultánea de adaptaciones dispares (fuerza máxima y resistencia cardiovascular/metabólica), presenta un conflicto biológico fundamental conocido como el "fenómeno de interferencia". A nivel molecular, este conflicto se manifiesta en la señalización antagonista entre la vía **mTOR** (mammalian Target of Rapamycin), responsable de la síntesis proteica y la hipertrofia, y la vía **AMPK** (Adenosine Monophosphate-activated Protein Kinase), activada por el estrés energético y el ejercicio de resistencia.1

Para un atleta convencional, la gestión de esta interferencia se realiza mediante la separación temporal de sesiones. Sin embargo, para Alex, cuyo perfil incluye un diagnóstico de TDAH medicado y un estilo de vida de alto estrés ("High Performer"), la gestión no puede basarse únicamente en horarios ideales, sino en la **readiness** (disposición) diaria real.1 El cortisol, elevado crónicamente por el estrés académico y empresarial, actúa como un amplificador de la señalización catabólica de la AMPK, lo que pone en riesgo la masa muscular durante la fase de "Definición" que Alex persigue actualmente.1

Por tanto, el "Hub Operativo" debe integrar un **Motor de Reglas** capaz de detectar no solo la fatiga física, sino la carga alostática total. Si el sistema detecta una noche de sueño inferior a 6 horas —un escenario común dado el historial de insomnio de Alex— debe tener la autonomía algorítmica para modificar la estructura de la sesión, reduciendo el volumen para mitigar el daño sin sacrificar la adherencia.1 Esta capacidad de auto-regulación es lo que diferencia una plantilla estática de un "Cerebro Digital".

### **1.2 Neuroergonomía: Diseño de Interfaz para el Cerebro TDAH**

El TDAH presenta desafíos específicos en la gestión de datos: la aversión al aburrimiento, la dificultad en la memoria de trabajo y la tendencia a la hiperfocalización o al abandono rápido si la fricción es alta. La interfaz del Google Sheet debe diseñarse bajo principios de "Anti-Gravedad", término que en este contexto implica la **automatización radical** de la entrada de datos y la visualización instantánea del progreso.

La estructura de datos debe ser **rígida en el back-end** pero **fluida en el front-end**. Esto significa que mientras las bases de datos internas (bibliotecas de ejercicios, lógica de periodización) son complejas y detalladas, la interfaz de usuario diaria (el Tracker) debe ser minimalista, eliminando cualquier decisión innecesaria (e.g., "¿Qué peso debo usar hoy?"). El sistema debe pre-llenar estos campos basándose en el rendimiento de la sesión anterior y el estado de recuperación actual, aplicando la **Regla de Milo** para la progresión automática de cargas.1

La integración de datos externos (Notion para gestión de tareas/proyectos y Fitia para nutrición) es vital para cerrar el bucle de retroalimentación. La nutrición no es un silo separado; es el combustible que permite la expresión de la fuerza. Si Fitia reporta un déficit calórico agresivo, el Hub Operativo debe saberlo para ajustar las expectativas de rendimiento en el gimnasio, evitando la frustración de no alcanzar números imposibles en un estado de baja disponibilidad energética.

## ---

**2\. Arquitectura de Datos y Flujos de Integración**

La solidez del sistema reside en su arquitectura subyacente. Utilizaremos un modelo de base de datos relacional implementado dentro de Google Sheets, donde cada "Pestaña" actúa como una tabla de entidad con claves primarias y foráneas que se interconectan.

### **2.1 Esquema de Entidades y Relaciones**

El ecosistema se compone de siete módulos interconectados que transforman los inputs brutos en inteligencia accionable. La estructura propuesta es la siguiente:

| Entidad (Pestaña) | Tipo de Dato | Función Sistémica | Fuente de Verdad |
| :---- | :---- | :---- | :---- |
| **00\_Onboarding** | Estático / Paramétrico | Almacena las constantes biológicas (Antropometría, Historial de Lesiones) y define los baremos de fuerza relativa. | Usuario (Inicial) |
| **01\_PlanBuilder** | Estructural | Define la arquitectura del macrociclo, mesociclos y la selección de ejercicios. Actúa como el "Arquitecto". | Coach / Sistema |
| **02\_ExerciseDB** | Base de Datos Maestra | Catálogo exhaustivo de ejercicios con metadatos biomecánicos (Perfil de Resistencia, SFR, Dominancia Molecular). | Sistema |
| **03\_LogicEngine** | Motor de Procesamiento | Contiene la lógica condicional (IF/THEN) para la auto-regulación, gestión de interferencia y progresión de cargas. | Sistema (Lógica Hardcoded) |
| **04\_Tracker\_Training** | Transaccional (Diario) | Interfaz de registro diario. Captura Carga, Reps, RPE, RIR y Feedback cualitativo. | Usuario |
| **05\_Tracker\_Nutrition** | Transaccional (Diario) | Receptáculo de datos nutricionales importados (Fitia) para correlacionar energía con rendimiento. | Fitia (Import) / Usuario |
| **06\_Readiness\_POMS** | Transaccional (Diario) | Monitorización psicométrica y fisiológica (Sueño, Estrés, HRV). | Usuario / Wearables |
| **07\_Dashboards** | Analítica Visual | Visualización de KPIs para cliente y coach. | Sistema (Cálculo) |
| **08\_Output\_IA** | Interoperabilidad | Generación de cadenas de texto estructuradas para análisis por LLMs externos. | Sistema |

### **2.2 Estrategia de Integración "Anti-Gravedad" (Notion y Fitia)**

La integración con fuentes externas como Notion y Fitia presenta desafíos técnicos específicos, dado que Fitia no ofrece una API pública abierta documentada en los fragmentos proporcionados, y el usuario solicita una integración en Sheets.2 La estrategia "Anti-Gravedad" aquí implica la creación de **puentes de datos automatizados** o de muy baja fricción.

#### **2.2.1 Integración con Fitia (Nutrición)**

Dado que Fitia es la fuente de verdad para la ingesta calórica y de macronutrientes, y considerando la falta de una API directa, diseñaremos el sistema para ingerir exportaciones CSV estructuradas o, en su defecto, un formulario de entrada rápida en el móvil (Google Forms vinculado al Sheet) que replique los totales diarios de Fitia.

* **Mecanismo de Ingesta:** La pestaña 05\_Tracker\_Nutrition estará diseñada con columnas idénticas a la estructura de datos que Fitia maneja internamente: Calorías, Proteínas, Carbohidratos, Grasas, Fibra y Agua.2  
* **Lógica de Sincronización:** El objetivo es correlacionar la ingesta del día *anterior* con el rendimiento del día *actual*. El sistema buscará discrepancias entre el "Objetivo Nutricional" (calculado en el Sheet según la fase) y el "Real" (importado de Fitia).

#### **2.2.2 Integración con Notion (Gestión de Vida)**

Notion actúa como el cerebro de gestión de proyectos de Alex. La integración aquí es bidireccional a nivel conceptual pero unidireccional en datos para el Sheet.

* **Flujo de Datos:** El Sheet necesita saber el "Nivel de Carga Laboral/Académica" para ajustar el entrenamiento. Esto se puede lograr mediante un script (Google Apps Script) que cuente el número de tareas marcadas como "High Priority" o "Due Today" en la base de datos de Notion de Alex y devuelva un índice de estrés (1-10) a la pestaña 06\_Readiness\_POMS.  
* **Justificación:** Si Alex tiene 5 entregas de universidad y 3 reuniones de junta en Notion para hoy, el Sheet debe saberlo *antes* de prescribir una sesión de Sentadillas al 95%.

## ---

**3\. Módulo de Onboarding: La "Zona Cero" del Diagnóstico**

La pestaña 00\_Onboarding es la piedra angular del sistema. No es un simple formulario de registro; es una herramienta de diagnóstico que establece las **Líneas Base (Baselines)** contra las cuales se medirán todas las desviaciones futuras. Basado en el archivo *Sistema Supremo...* 1 y el *Perfil de Alex* 1, este módulo debe capturar datos con precisión quirúrgica.

### **3.1 Datos Antropométricos y Baremos de Fuerza Relativa**

Estos campos no son meramente informativos; actúan como denominadores en las fórmulas de rendimiento del sistema.

* **Peso Corporal Inicial (kg):** Input numérico esencial. Alex comienza con aproximadamente 90-91 kg. Este valor se utiliza para calcular la fuerza relativa (e.g., 1RM / Peso Corporal), métrica crítica para evaluar la eficiencia neuromuscular en un contexto de pérdida de grasa.  
  * *Implicación Sistémica:* Si el peso baja (objetivo de definición) pero la fuerza absoluta se mantiene, la fuerza relativa aumenta. El sistema debe ser capaz de celebrar este "falso estancamiento" de carga como una victoria en eficiencia.1  
* **Porcentaje de Grasa Corporal (%):** Dato crítico para la lógica nutricional.  
  * *Regla de Negocio:* Si el % de grasa es \< 10% (en hombres), el sistema activará protocolos de seguridad en la pestaña de Nutrición, recomendando "Refeeds" obligatorios para prevenir el catabolismo muscular acelerado por la baja disponibilidad energética.1  
* **Altura (cm) y Edad:** Necesarios para cálculos de tasa metabólica basal (TMB) y frecuencia cardíaca máxima teórica (fórmulas de Karvonen/Whaley) utilizadas en la prescripción de zonas de cardio.1

### **3.2 Perfil de Experiencia y Algoritmo de Nivel**

El sistema no debe confiar únicamente en la auto-evaluación del usuario. Debe calcular el "Nivel de Entrenamiento Real" para ajustar el volumen.

* **Algoritmo de Clasificación:** Se implementará una fórmula que pondere tres variables:  
  1. **Años de Experiencia:** (Alex: Avanzado/Ex-Rugby).  
  2. **Fuerza Relativa:** Comparación de sus marcas (Squat 120kg, Deadlift 140kg) contra tablas estandarizadas.  
  3. **Calidad Técnica:** Autoevaluación (1-4). Alex reporta buena técnica general pero necesidad de transición en Squat.1  
* **Resultado del Algoritmo:** El sistema clasificará a Alex como "Intermedio-Avanzado" o "Avanzado".  
  * *Impacto en Programación:* Si el nivel es "Avanzado", el PlanBuilder desbloqueará volúmenes de 20-30 series semanales por grupo muscular. Si fuera "Principiante", limitaría a 6-10 series para priorizar la recuperación y el aprendizaje motor.1

### **3.3 Diagnóstico Biomecánico y de Movilidad**

Dada la transición de Alex del Multipower al Peso Libre y su historial de rugby, la prevención de lesiones es prioritaria.

* **Test de Dorsiflexión de Tobillo:** Input numérico (cm o grados).  
  * *Regla de Seguridad:* Si la dorsiflexión es \< 35° o \< 10cm, o si existe una asimetría \> 10% entre tobillos, el sistema generará una alerta en la selección de ejercicios de pierna: *"Advertencia: Limitar profundidad en Sentadilla o usar calzado con tacón (Weightlifting Shoes)"*.1  
* **Control Lumbopélvico:** Evaluación de estabilidad (Test de cuadrupedia).  
  * *Lógica:* Si el control es "Inestable", el sistema sugerirá priorizar variantes de Peso Muerto Rumano (RDL) sobre el Convencional para proteger la zona lumbar baja hasta que mejore la estabilidad del core.1

### **3.4 Configuración de Estilo de Vida y Restricciones TDAH**

* **Farmacología y Horarios:** Registro de la toma de medicación para el TDAH.  
  * *Insight:* La medicación afecta el apetito y la frecuencia cardíaca basal.1 El sistema debe tener en cuenta esto al analizar la FC en Reposo y la ingesta calórica (posible falta de apetito durante el día, hambre rebote en la noche).  
* **Factores de Estrés (Stressors):** Alex tiene un estrés "Alto" por defecto. El sistema iniciará con una configuración de volumen conservadora ("Minimum Effective Volume") para evitar el burnout temprano, permitiendo escalar solo si el feedback de recuperación es positivo.

## ---

**4\. Biblioteca de Ejercicios: Taxonomía Biomecánica y Metabólica**

La pestaña 02\_ExerciseDB trasciende la función de un simple catálogo. Es el "Genoma" del entrenamiento. Cada ejercicio en esta base de datos debe estar etiquetado con metadatos ricos que permitan al Motor de Reglas tomar decisiones inteligentes sobre sustituciones, gestión de fatiga y especificidad. Basado en la evidencia de *Biomecánica MEP* 1 y *Sistema Supremo*.1

### **4.1 Estructura de Campos y Taxonomía Avanzada**

Para cada ejercicio, definiremos las siguientes columnas de metadatos:

1. **Identificador Único (ID):** Clave primaria (e.g., LEG\_SQUAT\_LB).  
2. **Nombre del Ejercicio:** (e.g., "Sentadilla Barra Libre").  
3. **Patrón de Movimiento Fundamental:** Clasificación biomecánica esencial para asegurar el balance estructural del programa.  
   * *Categorías:* Squat, Hinge (Bisagra), Lunge (Zancada), Push Horizontal, Push Vertical, Pull Horizontal, Pull Vertical, Carry (Transporte), Core Anti-Extension, Core Anti-Rotation.  
4. **Perfil de Resistencia (Resistance Profile):** Define en qué parte del recorrido el ejercicio es más difícil. Esta información es crucial para la selección de ejercicios complementarios.1  
   * *Valores:*  
     * **Ascendente:** Más difícil al final de la concéntrica (e.g., Hip Thrust, Gomas).  
     * **Descendente:** Más difícil al inicio de la concéntrica/estiramiento (e.g., Elevaciones Laterales, Sentadilla).  
     * **En Campana (Bell Curve):** Más difícil en el medio (e.g., Curl de Bíceps con barra).  
   * *Aplicación Práctica:* Si Alex realiza una Sentadilla (Descendente, difícil abajo), el sistema puede sugerir complementar con una Extensión de Cuádriceps (Ascendente, difícil arriba) para estimular el músculo en todo su rango de fuerza.  
5. **Ratio de Estímulo-Fatiga (SFR \- Stimulus to Fatigue Ratio):** Una métrica subjetiva pero vital para la auto-regulación.1  
   * *Escala:* 1 (Pésimo: Mucha fatiga, poco estímulo) a 10 (Excelente: Alto estímulo, poca fatiga sistémica).  
   * *Lógica:* Los ejercicios compuestos pesados (Sentadilla, Peso Muerto) tienen un SFR alto en estímulo pero también un coste sistémico masivo. Los ejercicios de aislamiento (Curl Predicador) tienen bajo coste sistémico.  
6. **Dominancia de Vía Metabólica (Interferencia):** Clasificación para gestionar el conflicto AMPK/mTOR.  
   * *Valores:* **mTOR** (Fuerza/Hipertrofia pura), **AMPK** (Resistencia/Metabólico), **Mixto** (CrossFit, HIIT).  
   * *Uso:* El Dashboard de Coach utilizará este campo para visualizar la carga de interferencia semanal.

### **4.2 Lógica de Regresión y Progresión (Inteligencia de Lesiones)**

Para cada ejercicio "Padre", la base de datos debe incluir punteros a sus variantes:

* **Variante de Regresión (Safety Valve):** El ejercicio a realizar si Alex reporta dolor articular o fatiga extrema.  
  * *Ejemplo:* Si Target \= Sentadilla Barra Libre, Regresión \= Hack Squat o Prensa de Piernas. (Elimina el factor de estabilidad y carga axial).  
* **Variante de Progresión:** El siguiente paso lógico si se estanca.  
  * *Ejemplo:* Si Target \= Sentadilla Barra Libre, Progresión \= Sentadilla con Pausa o con Cadenas (Acomodación de resistencia).

### **4.3 Campos de Ejecución Técnica (Cues)**

Dado que Alex está en transición técnica en la Sentadilla y Peso Muerto 1, la base de datos incluirá un campo de **"Technical Cues"**.

* *Contenido:* Breves recordatorios biomecánicos extraídos de la literatura.  
  * *Sentadilla:* "Rodillas hacia afuera, activar arco plantar, chest up".  
  * *Peso Muerto:* "Empujar el suelo, no tirar con la espalda, slack out of the bar".  
  * *Isquiosurales:* Recordar que el "Punto de Máximas Demandas" es la primera parte del ROM 1, por lo que se debe enfatizar el estiramiento bajo carga.

## ---

**5\. El Motor Lógico: Algoritmos de Auto-Regulación y Gestión de Interferencia**

La pestaña 03\_LogicEngine es el "Cerebro" oculto del sistema. Aquí es donde los datos crudos se convierten en decisiones de entrenamiento mediante fórmulas lógicas complejas. Este motor implementa las "Leyes" de entrenamiento descritas en *Constitución Lógica del Ecosistema...* 1 y las estrategias de gestión molecular de.1

### **5.1 Algoritmos de Auto-Regulación de la Carga (Fatiga y Readiness)**

El sistema debe ajustar el volumen y la intensidad del día basándose en el estado actual de Alex. Esto es fundamental para un atleta con TDAH y estrés fluctuante.

#### **A. La Regla de Seyle (Gestión del Síndrome de Adaptación General)**

Esta regla protege a Alex del sobreentrenamiento sistémico.

* **Lógica Narrativa:** El sistema evalúa el rendimiento de fuerza promedio de la semana en curso. Si este rendimiento ha caído por debajo del 90% de la línea base establecida, Y simultáneamente el puntaje de fatiga reportado en el Check-in semanal es superior a 8 (en escala de 10), se activa un "Protocolo de Emergencia".  
* **Ejecución en Sheet:**  
  * IF(AND(Weekly\_Avg\_Strength \< 0.90, Fatigue\_Score \> 8), "DELOAD\_FORZADO", "NORMAL").  
  * **Consecuencia:** Si el resultado es "DELOAD\_FORZADO", el Tracker\_Training reduce automáticamente el número de series prescritas en un 50% para la siguiente semana, manteniendo la intensidad (peso) para preservar las adaptaciones neurales pero eliminando el volumen fatigante.1

#### **B. La Regla de Milo (Progresión Continua)**

Esta regla asegura que Alex no se estanque por falta de desafío o complacencia.

* **Lógica Narrativa:** Si en la sesión anterior de un ejercicio dado, el RPE (Esfuerzo Percibido) reportado fue igual o menor a 7 (indicando que la serie fue "fácil" con \>3 repeticiones en reserva), Y el atleta se encuentra en una fase de "Preparación" o "Acumulación", el sistema prescribe automáticamente un aumento de carga.  
* **Ejecución en Sheet:**  
  * IF(AND(Last\_Session\_RPE \<= 7, Phase \= "Acumulación"), Last\_Load \* 1.05, Last\_Load).  
  * **Consecuencia:** El campo "Peso Objetivo" para la sesión de hoy se actualiza con un incremento del 5%, empujando a Alex a aplicar sobrecarga progresiva.1

#### **C. Ajuste Dinámico por Sueño y Estrés (Factor TDAH)**

* **Lógica Narrativa:** El sueño es el regulador maestro. Si Alex reporta haber dormido menos de 6 horas, o si su nivel de estrés subjetivo es mayor a 7, su capacidad de recuperación neurológica está comprometida.  
* **Ejecución en Sheet:**  
  * IF(OR(Sleep \< 6, Stress \> 7), "REDUCE\_VOL\_20%\_CAP\_RPE7", "VOLUMEN\_ESTANDAR").  
  * **Consecuencia:** Aparece una alerta visual en el Tracker: *"Alerta de Recuperación: Reduce 1 serie por ejercicio y no pases de RPE 7 hoy"*. Esto permite mantener el hábito de entrenar (adherencia) sin cavar un pozo de fatiga más profundo.

### **5.2 Gestión Molecular del Fenómeno de Interferencia (AMPK vs mTOR)**

Para optimizar la concurrencia de objetivos (fuerza y resistencia), el sistema aplicará reglas de separación temporal y nutricional basadas en.1

#### **A. Regla de Separación Temporal**

* **Lógica:** La activación de AMPK (cardio) inhibe la vía mTOR (hipertrofia). Para minimizar esto, las sesiones deben separarse.  
* **Algoritmo:**  
  * Si Sesión\_1\_Tipo \= "Fuerza/Hipertrofia" Y Sesión\_2\_Tipo \= "Cardio/HIIT".  
  * Verificar Delta\_Tiempo entre fin de Sesión 1 e inicio de Sesión 2\.  
  * **Condición:** Si Delta\_Tiempo \< 6 horas, mostrar alerta de **"ALTO RIESGO DE INTERFERENCIA"**.  
  * **Recomendación Automática:** *"Ingerir carbohidratos rápidos \+ proteína inmediatamente post-sesión 1 para reiniciar señalización"*.

#### **B. Protocolo de "Silenciamiento" de AMPK**

* **Contexto:** Si Alex realiza una sesión de cardio por la mañana (AM) y pesas por la tarde (PM).  
* **Trigger:** Detectar doble sesión en el calendario.  
* **Acción:** En la pestaña de Nutrición, insertar automáticamente una recomendación para el periodo post-cardio (First 2 hours):  
  * *Protocolo:* **1.2 g/kg/h de Carbohidratos \+ 0.4 g/kg de Proteína Whey**.  
  * *Objetivo:* Elevar la insulina rápidamente para "silenciar" la AMPK y reponer glucógeno antes de la sesión de fuerza de la tarde, protegiendo así la capacidad de señalización mTOR.1

## ---

**6\. Subsistema de Rastreo Operativo (Training Tracker)**

La pestaña 04\_Tracker\_Training es la interfaz de usuario principal. Debe diseñarse pensando en el perfil neurodivergente de Alex: limpia, libre de distracciones y altamente gratificante (gamificada).

### **6.1 Diseño de Experiencia de Usuario (UX) para TDAH**

* **Minimalismo Visual:** Solo deben ser visibles las columnas necesarias para la sesión de hoy. Las sesiones pasadas deben ocultarse o archivarse automáticamente mediante agrupación de filas.  
* **Feedback Inmediato (Dopamina):** Al ingresar los datos de una serie (Kilos x Reps), una celda adyacente debe calcular instantáneamente el **1RM Estimado (e1RM)** del día.  
  * *Gamificación:* Si el e1RM\_Hoy \> e1RM\_Récord\_Histórico, la celda se ilumina en **Verde Neón**. Este micro-feedback positivo refuerza la conducta de esfuerzo inmediato.

### **6.2 Campos de Registro y Fórmulas**

1. **Ejercicio:** Pre-poblado desde el PlanBuilder.  
2. **Series de Aproximación (Warm-up):** Calculadora automática oculta que muestra: *"Calentamiento: Barra vacía x 10 \-\> 40kg x 5 \-\> 60kg x 3 \-\> 80kg x 1"* basado en el peso de trabajo objetivo.1  
3. **Registro de Series Efectivas:**  
   * **Carga (kg):** Input.  
   * **Reps:** Input.  
   * **RPE (1-10) / RIR (0-4):** Input crítico para la auto-regulación.  
4. **Cálculo de e1RM (Brzycki):**  
   * Fórmula: Peso / (1.0278 \- (0.0278 \* Reps)).  
   * Esta métrica normaliza el rendimiento, permitiendo comparar una serie de 100kg x 5 reps con una de 110kg x 3 reps.  
5. **Notas Biomecánicas:** Campo de texto libre para sensaciones subjetivas (e.g., "Molestia rodilla derecha al romper paralelo"). Estas notas se agregan al Dashboard\_Coach para análisis cualitativo.

### **6.3 Cálculo de Carga ECOS**

Para cuantificar la carga interna total de la sesión y alimentar el gráfico de fatiga crónica/aguda.

* **Fórmula:** ECOS \= Tiempo\_Sesión (min) \* Factor\_Intensidad \* Densidad.1  
* *Factor Intensidad:* Derivado del RPE promedio de la sesión.  
* *Densidad:* Relación trabajo/descanso.  
* Esta métrica unificada permite comparar el estrés de una sesión de pesas con una de cardio.

## ---

**7\. Subsistema de Nutrición y Sincronización Molecular**

La pestaña 05\_Tracker\_Nutrition actúa como el puente entre los datos de Fitia y la realidad metabólica de Alex.

### **7.1 Estructura de Importación de Datos (Fitia Mapping)**

Dado que la API de Fitia no es accesible directamente, este módulo se diseña para recibir un **Dump CSV** semanal o diario. Las columnas deben mapear exactamente los campos de Fitia para facilitar el "Copy-Paste" o la importación mediante script.

* **Columnas:** Fecha, Calorías Totales, Proteínas (g), Carbohidratos (g), Grasas (g), Fibra (g).  
* **Validación de Datos:** El sistema comparará estos inputs "Reales" contra los "Objetivos" calculados.  
  * *Objetivo Proteína:* **2.3 a 3.1 g/kg de Masa Libre de Grasa** (para fase de definición en atleta avanzado).1  
  * *Déficit Calórico:* 300-500 kcal bajo mantenimiento para una pérdida de peso controlada de 0.5-1.0% semanal.

### **7.2 Lógica de Auditoría Nutricional**

El sistema auditará el progreso semanal usando las reglas de.1

* **Regla de Estancamiento de Peso:**  
  * Si el promedio de peso de los últimos 7 días NO ha bajado respecto a la semana anterior, Y la adherencia dietética reportada es \> 90% durante 14 días consecutivos.  
  * **Acción:** El sistema sugiere: *"Reducir 250 kcal diarias O Aumentar 2,000 pasos diarios (NEAT)"*.1  
* **Regla de "Diet Break" (Burnout):**  
  * Si Alex reporta en el Check-in sentirse "mentalmente quemado" o desmotivado por \> 7 días.  
  * **Acción:** Sugerir *"Diet Break: 7 días a calorías de mantenimiento para restaurar balance hormonal (Leptina/T3) y psicológico"*.1

### **7.3 Protocolos de Suplementación Específicos**

Integrando la información de 1, el sistema recomendará suplementación contextual:

* **Emergencia de Sueño (\<4h):** Si el Readiness reporta sueño crítico, sugerir carga masiva de Creatina (0.35 g/kg) para restaurar fosfocreatina cerebral y pH, y limitar cafeína a \<200mg antes de las 12:00 PM.  
* **Intra-Entreno (Sesiones Largas):** Para sesiones \> 90 min o dobles, recomendar Cluster Dextrin \+ EAA para mantener la presión osmótica y la disponibilidad de sustratos.

## ---

**8\. Monitorización del Estado (Readiness) y Visualización (Dashboards)**

Los datos no sirven si no se visualizan. Los módulos 06\_Readiness\_POMS, 07\_Dashboards y 08\_Output\_IA cierran el ciclo de información.

### **8.1 POMS y Perfil Iceberg**

El cuestionario POMS (Profile of Mood States) es una herramienta psicométrica estándar oro para detectar sobreentrenamiento.1

* **Input Diario:** Alex evalúa del 1-10: Tensión, Depresión, Cólera, Vigor, Fatiga, Confusión.  
* **Cálculo Visual:** El sistema grafica estos valores. Un perfil saludable se ve como un "Iceberg" (Vigor alto, todo lo demás bajo).  
* **Alerta de Inversión:** Si la línea de "Fatiga" cruza por encima de la de "Vigor", el iceberg se invierte. Esto es un marcador temprano de sobreentrenamiento o burnout académico/laboral. El sistema disparará una "Alerta Amarilla" recomendando reducir la intensidad.

### **8.2 Dashboard del Cliente (Visualización TDAH-Friendly)**

Para Alex, este dashboard debe ser simple, directo y motivador.

* **Semáforo de Readiness:** Un indicador grande (Círculo de color) que resume toda la complejidad del Motor de Reglas.  
  * *Verde:* "Go Hard. Hoy es día de récord."  
  * *Ámbar:* "Entrena con cautela. Volumen moderado."  
  * *Rojo:* "Descanso activo o Deload. Prioriza dormir."  
* **Gráfico de Progreso de Fuerza:** Línea de tendencia del e1RM en Squat y Deadlift. Ver la línea subir es la mayor recompensa para el cerebro.  
* **Estado de Composición Corporal:** Gráfico de Peso vs Objetivo, con bandas de tolerancia para la tasa de pérdida (0.5-1% semanal).

### **8.3 Dashboard del Coach (Analítica Profunda)**

Para el entrenador, la visión es técnica.

* **Ratio de Carga Aguda:Crónica (ACWR):** Gráfico que compara la carga ECOS de esta semana (Aguda) vs el promedio de las últimas 4 semanas (Crónica). Mantener el ratio entre 0.8 y 1.3 para minimizar riesgo de lesión.3  
* **Matriz de Adherencia:** Visualización tipo "Github Contributions" que muestra consistencia en entrenamiento y nutrición.  
* **Interferencia Check:** Gráfico de dispersión mostrando proximidad temporal de sesiones de cardio vs fuerza.

### **8.4 Output IA (Interoperabilidad)**

La pestaña 08\_Output\_IA preparará los datos para el futuro. Usará fórmulas de concatenación para crear un "Resumen JSON-like" en texto plano de la semana de Alex.

* *Formato:* {"Fecha": "2026-02-01", "e1RM\_Squat": 125, "Sleep\_Avg": 6.5, "Stress": "High", "Feedback": "Dolor rodilla"}.  
* *Uso:* Alex puede copiar esta celda y pegarla en ChatGPT/Claude para pedir un "Análisis cualitativo profundo" o "Generar mensaje motivacional", extendiendo la funcionalidad del Sheet sin programar.

## ---

**9\. Hoja de Ruta de Implementación**

Para materializar esta arquitectura, se propone un despliegue en tres fases:

1. **Fase 1: Cimientos (Semana 1):** Configuración de pestañas Onboarding, ExerciseDB y PlanBuilder. Importación de datos estáticos y definición de validaciones de datos.  
2. **Fase 2: Conectividad y Lógica (Semana 2):** Implementación del LogicEngine y las fórmulas complejas de auto-regulación. Diseño del Tracker diario y pruebas de usabilidad (UX) para asegurar baja fricción.  
3. **Fase 3: Integración y Visualización (Semana 3):** Configuración de las pestañas de importación para Fitia/Notion. Construcción de los Dashboards y calibración de las alertas de sensibilidad (e.g., ajustar los umbrales de sueño/estrés según feedback real de Alex).

Esta estructura definitiva provee a Alex Aguirre no solo de una herramienta de registro, sino de un ecosistema bio-digital resiliente, capaz de adaptarse a su fisiología única y potenciar su rendimiento en medio de un estilo de vida exigente.

#### **Obras citadas**

1. Biomecánica y Técnica del Peso Muerto  
2. AI-Powered Calorie Counter & Diet Plans, fecha de acceso: febrero 1, 2026, [https://fitia.app/](https://fitia.app/)  
3. Herramienta de programación Jorge Pérez Córdoba.xlsx, [https://drive.google.com/open?id=1N4fh2X8P162wmTVR31ZO0ooRESi0AH59](https://drive.google.com/open?id=1N4fh2X8P162wmTVR31ZO0ooRESi0AH59)