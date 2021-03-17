library mCODE version '1'

using FHIR version '4.0.0'

codesystem "SNOMEDCT": 'http://snomed.info/sct'
codesystem "LOINC": 'http://loinc.org'
codesystem "RXNORM": 'http://www.nlm.nih.gov/research/umls/rxnorm'
codesystem "V20074": 'http://terminology.hl7.org/CodeSystem/v2-0074'
codesystem "OBSCAT": 'http://terminology.hl7.org/CodeSystem/observation-category'

valueset "Cancer Body Location Value Set": 'mcode-cancer-body-location-vs'
valueset "Cancer Disease Status Evidence Type Value Set": 'mcode-cancer-disease-status-evidence-type-vs'
valueset "Cancer Disorder Value Set": 'mcode-cancer-disorder-vs'
valueset "Cancer-Related Surgical Procedure Value Set": 'mcode-cancer-related-surgical-procedure-vs'
valueset "Cancer Staging System Value Set": 'mcode-cancer-staging-system-vs'
valueset "ClinVar Value Set": 'mcode-clinvar-vs'
valueset "Comorbid Condition Value Set": 'mcode-comorbid-condition-vs'
valueset "Condition Status Trend Value Set": 'mcode-condition-status-trend-vs'
valueset "Genetic Specimen Type Value Set": 'mcode-genetic-specimen-type-vs'
valueset "HUGO Gene Nomenclature Committee Gene Names Value Set": 'mcode-hgnc-vs'
valueset "Human Genome Variation Society Sequence Variant Nomenclature Value Set": 'mcode-hgvs-vs'
valueset "Histology Morphology Behavior Value Set": 'mcode-histology-morphology-behavior-vs'
valueset "Laterality Value Set": 'mcode-laterality-vs'
valueset "Primary or Uncertain Behavior Cancer Disorder Value Set": 'mcode-primary-or-uncertain-behavior-cancer-disorder-vs'
valueset "Radiation Procedure Value Set": 'mcode-radiation-procedure-vs'
valueset "Radiation Target Body Site Value Set": 'mcode-radiation-target-body-site-vs'
valueset "Secondary Cancer Disorder Value Set": 'mcode-secondary-cancer-disorder-vs'
valueset "TNM Distant Metastases Category Value Set": 'mcode-tnm-distant-metastases-category-vs'
valueset "TNM Primary Tumor Category Value Set": 'mcode-tnm-primary-tumor-category-vs'
valueset "TNM Regional Nodes Category Value Set": 'mcode-tnm-regional-nodes-category-vs'
valueset "TNM Stage Group Value Set": 'mcode-tnm-stage-group-vs'
valueset "Treatment Intent Value Set": 'mcode-treatment-intent-vs'
valueset "Treatment Termination Reason Value Set": 'mcode-treatment-termination-reason-vs'
valueset "TumorMarkerTestVS": 'mcode-tumor-marker-test-vs'
valueset "Units of Length Value Set": 'mcode-units-of-length-vs'

code "CancerDiseaseStatus Code": '88040-1' from "LOINC"
code "CancerGeneticVariant Code": '69548-6' from "LOINC"
code "CancerGenomicsReport Code": '81247-9' from "LOINC"
code "ECOGPerformanceStatus Code": '89247-1' from "LOINC"
code "GenomicRegionStudied Code": '53041-0' from "LOINC"
code "KarnofskyPerformanceStatus Code": '89243-0' from "LOINC"
code "TNMClinicalDistantMetastasesCategory Code": '21907-1' from "LOINC"
code "TNMClinicalPrimaryTumorCategory Code": '21905-5' from "LOINC"
code "TNMClinicalRegionalNodesCategory Code": '21906-3' from "LOINC"
code "TNMClinicalStageGroup Code": '21908-9' from "LOINC"
code "TNMPathologicalDistantMetastasesCategory Code": '21901-4' from "LOINC"
code "TNMPathologicalPrimaryTumorCategory Code": '21899-0' from "LOINC"
code "TNMPathologicalRegionalNodesCategory Code": '21900-6' from "LOINC"
code "TNMPathologicalStageGroup Code": '21902-2' from "LOINC"

define "CancerDiseaseStatus":
	[Observation: "CancerDiseaseStatus Code"]

define "CancerGenomicsReport":
	[DiagnosticReport: "CancerGenomicsReport Code"]

define "CancerRelatedRadiationProcedure":
	[Procedure: "Radiation Procedure Value Set"]

define "CancerRelatedSurgicalProcedure":
	[Procedure: "Cancer-Related Surgical Procedure Value Set"]

define "ComorbidCondition":
	[Condition: "Comorbid Condition Value Set"]

define "ECOGPerformanceStatus":
	[Observation: "ECOGPerformanceStatus Code"]

define "GeneticSpecimen":
	[Specimen: "Genetic Specimen Type Value Set"]

define "GenomicRegionStudied":
	[Observation: "GenomicRegionStudied Code"]

define "KarnofskyPerformanceStatus":
	[Observation: "KarnofskyPerformanceStatus Code"]

define "PrimaryCancerCondition":
	[Condition: "Primary or Uncertain Behavior Cancer Disorder Value Set"]

define "SecondaryCancerCondition":
	[Condition: "Secondary Cancer Disorder Value Set"]

define "TNMClinicalDistantMetastasesCategory":
	[Observation: "TNMClinicalDistantMetastasesCategory Code"]

define "TNMClinicalPrimaryTumorCategory":
	[Observation: "TNMClinicalPrimaryTumorCategory Code"]

define "TNMClinicalRegionalNodesCategory":
	[Observation: "TNMClinicalRegionalNodesCategory Code"]

define "TNMClinicalStageGroup":
	[Observation: "TNMClinicalStageGroup Code"]

define "TNMPathologicalDistantMetastasesCategory":
	[Observation: "TNMPathologicalDistantMetastasesCategory Code"]

define "TNMPathologicalPrimaryTumorCategory":
	[Observation: "TNMPathologicalPrimaryTumorCategory Code"]

define "TNMPathologicalRegionalNodesCategory":
	[Observation: "TNMPathologicalRegionalNodesCategory Code"]

define "TNMPathologicalStageGroup":
	[Observation: "TNMPathologicalStageGroup Code"]

define "TumorMarker":
	[Observation: "TumorMarkerTestVS"]

