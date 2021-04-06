library mCODE version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
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
code "CancerGeneticVariant Gene Studied Code": '48018-6' from "LOINC"
code "CancerGenomicsReport Code": '81247-9' from "LOINC"
code "ECOGPerformanceStatus Code": '89247-1' from "LOINC"
code "ECOGPerformance Code": '89262-0' from "LOINC"
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

context Patient

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

//*************************************//
//*********** PATIENT GROUP ***********//
//*************************************//

//*********** Cancer Patient ***********//

define "Cancer Patient Date Of Birth":  // patient-1
    Patient.birthDate 

// What is the syntax for drilling down into extensions?
define "Cancer Patient Birth Sex":  // patient-3
    Patient.extension E
        where E.url.value = 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex'
        return E.value 

define "Cancer Patient Current Addresses":  // patient-4,5,6,7,8
    Patient.address A    
         where A.period contains (Now()) or
               A.period is null

    // us-core-race extension     "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race"
    // Extension with two valueCoding and one string
    // OMB Race Category - url=ombCategory
    // Detailed Race (required) - url=detailed
    // Race Text (required) - url=text
define "Cancer Patient Race Codes": // patient-13
    Flatten(
      Patient.extension E
        where
          E.url.value = 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race'
        return (
          E.extension E2
            where E2.url.value = 'ombCategory'
            return E2.value as FHIR.Coding
        )
    )


    // us-core-ethnicity extension "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity"
    // Extension with two valueCoding and one string
    // OMB Ethnicity Category - url=ombCategory
    // detailed Ethnicity- url=detailed
    // Ethnicity Text - url=text
    // Patient.extension:ethnicity.extension:ombCategory.valueCoding
define "Cancer Patient Ethnicity Codes": // patient -14
    Flatten(
      Patient.extension E
        where
          E.url.value = 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity'
        return (
          E.extension E2
            where E2.url.value = 'ombCategory'
            return E2.value as FHIR.Coding
        )
    )

//*********** ECOGPerformanceStatus ***********//
//define "ECOG Performance Statuses":
//    [Observation: "ECOGPerformance code"]

define "Most Recent ECOG Performance Status":
 First("ECOGPerformanceStatus" K 
 	where K.status in {'final', 'amended', 'corrected'} 
	 sort by effective desc)

define function "ECOG Performance Status Value" (O Observation): // patient-17 and patient-18
          O.value // Integer


//*********** KarnofskyPerformanceStatus ***********//

define "Most Recent Karnofsky Performance Status":
 First("KarnofskyPerformanceStatus" K 
 	where K.status in {'final', 'amended', 'corrected'} 
	 sort by effective desc )

define function "Karnofsky Performance Status Value" (O Observation): // patient-17 and patient-18
          O.value // Integer

//*************************************//
//*********** DISEASE GROUP ***********//
//*************************************//

//*********** Primary Cancer Condition ***********//
define function "Primary Cancer Condition Body Sites" (C Condition):             // disease-1
        C.bodySite

define function "Primary Cancer Condition Body Site Laterality" (BodySite CodeableConcept): // disease-2
    singleton from (
      BodySite.extension Laterality
      where
        Laterality.url.value = 'http://hl7.org/fhir/us/mcode/StructureDefinition/mcode-laterality'
      return (
        Laterality.value as FHIR.CodeableConcept // enfore valueCodeableConcept only
      )
    )

define function "Primary Cancer Condition Clinical Status" (C Condition):      // disease-3
        C.clinicalStatus

define function "Primary Cancer Condition Code" (C Condition):      // disease-4
        C.code

define function "Primary Cancer Condition Date of Diagnosis" (C Condition): // disease-5
    singleton from (
      C.extension AssertedDate
      where
        AssertedDate.url.value = 'http://hl7.org/fhir/StructureDefinition/condition-assertedDate'
      return (
        AssertedDate.value as FHIR.dateTime
      )
    )

define function "Primary Cancer Condition Histology Morphology Behavior" (C Condition): // disease-6
    singleton from (C.extension HMB
      where
        HMB.url.value = 'http://hl7.org/fhir/us/mcode/StructureDefinition/mcode-histology-morphology-behavior'
      return (
        HMB.value as FHIR.CodeableConcept 
      )
    )

define function "Primary Cancer Condition Verification Status" (C Condition): // disease-7
  C.verificationStatus

//*********** TNM Clinical Stage Group ***********//

define "TNM Clinical Stage Groups":
  [Observation: "TNMClinicalStageGroup Code"]

define function "Is TNM Clinical Stage Group" (O Observation):
	O.code = "TNMClinicalStageGroup Code"
  
define function "Current TNM Clinical Stage Groups" (C Condition):
  flatten(C.stage.assessment Assessment
    where Assessment is not null
    return (
      "TNM Clinical Stage Groups" StageGroup
        where StageGroup.id = "Reference id"(Assessment)
    )
  )  

define function "Latest TNM Clinical Stage Group" (C Condition):
  First([Observation] StageGroup 
    where "Is TNM Clinical Stage Group"(StageGroup)
      and C.id = "Reference id"(StageGroup.focus)
    sort by effective desc)

define function "Earliest TNM Clinical Stage Group" (C Condition):
  First([Observation] StageGroup 
    where "Is TNM Clinical Stage Group"(StageGroup)
      and C.id = "Reference id"(StageGroup.focus)
    sort by effective asc)

// Returns [Observation] for all hasMember references from an Observation
define function "TNM Clinical Stage Group Categories" (O Observation):
    Flatten(O.hasMember h
      return([Observation] member where member.id = "Reference id"(h as FHIR.Reference))
    )

define function "TNM Clinical Stage Group Value" (O Observation):             // disease-15
  O.value as FHIR.CodeableConcept // enfore valueCodeableConcept only

define function "TNM Clinical Stage Group Staging System" (O Observation):             // disease-16
  O.method         

// get id from a reference string - this should be in a utility library
// will fail with uri schemes that are not urn or absolute/relative URL
define function "Reference id" (ref FHIR.Reference):
  if StartsWith(ref.reference, 'urn:')
  then Last(Split(ref.reference, ':'))
  else Last(Split(ref.reference, '/'))

//*********** TNM Clinical Primary Tumor Category ***********//

define "TNM Clinical Primary Tumor Categories":
  [Observation: "TNMClinicalPrimaryTumorCategory Code"]

define function "Is TNM Clinical Primary Tumor Category" (O Observation):
	O.code = "TNMClinicalPrimaryTumorCategory Code"

define function "Current TNM Clinical Primary Tumor Categories" (C Condition):
  ("Current TNM Clinical Stage Groups"(C)) StageGroup
    where StageGroup is not null
    return( ("TNM Clinical Stage Group Categories"(StageGroup)) category
      where ("Is TNM Clinical Primary Tumor Category" (category))
      and category.status in {'final','amended','corrected'}
    )

define function "Latest TNM Clinical Primary Tumor Categories" (C Condition):
  ("TNM Clinical Stage Group Categories"(
    "Latest TNM Clinical Stage Group"(C)
  )) category
    where "Is TNM Clinical Primary Tumor Category"(category)
      and category.status in {'final','amended','corrected'}

define function "Earliest TNM Clinical Primary Tumor Categories" (C Condition):
  ("TNM Clinical Stage Group Categories"(
    "Earliest TNM Clinical Stage Group"(C)
  )) category
    where "Is TNM Clinical Primary Tumor Category"(category)
      and category.status in {'final','amended','corrected'}      

//**************************************//
//*********** GENOMICS GROUP ***********//
//**************************************//
	
//***** CancerGeneticVariant ***********//

define "Cancer Genetic Variants":
    [Observation: "CancerGeneticVariant Code"]

define function "Filter Cancer Genetic Variants"(Observations List<Observation>):
        Observations O
            where "Is Cancer Genetic Variant"(O)

define function "Is Cancer Genetic Variant"(O Observation):
    O.code = "CancerGeneticVariant Code"

define function "Cancer Genetic Variant Data Value"(O Observation): //genomics-16
    O.value

define function "Cancer Genetic Variant Method"(O Observation): //genomics-17
    O.method

define function "Cancer Genetic Variant Gene Studied"(O Observation): //genomics-22
    O.component c
        where c.code = "CancerGeneticVariant Gene Studied Code"
        return all c.value

//***** TumorMarker
define function "Tumor Markers By Value Set" (VS ValueSet):
//Query Observation.code in Value Set and Observation.category.code = laboratory and status in {final, amended, corrected}
  [Observation: VS] O
    where 
     O.status in {'final','amended','corrected'}
     return(
       O.category c
          where 'laboratory' in c.coding.code  
          return(O)
       )  
      
      
define function "Tumor Marker Code" (O Observation):
         O.code

define function "Tumor Marker Data Value" (O Observation):
     // O.valueCodeableConcept or O.valueQuantity or O.valueRatio
     O.value