library mCODECancerGeneticVariant version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers

codesystem "LOINC": 'http://loinc.org'

code "CancerGeneticVariant Code": '69548-6' from "LOINC"
code "CancerGeneticVariant Gene Studied Code": '48018-6' from "LOINC"

define "Cancer Genetic Variants":
    [Observation: "CancerGeneticVariant Code"]

define function "Filter Cancer Genetic Variants"(Observations List<Observation>):
    Observations O
        where "Is Cancer Genetic Variant"(O)

define function "Is Cancer Genetic Variant"(O Observation):
    O.code = "CancerGeneticVariant Code"

define function "Data Value"(O Observation): //genomics-16
    O.value

define function "Method"(O Observation): //genomics-17
    O.method

define function "Gene Studied"(O Observation): //genomics-22
    O.component c
        where c.code = "CancerGeneticVariant Gene Studied Code"
        return all c.value