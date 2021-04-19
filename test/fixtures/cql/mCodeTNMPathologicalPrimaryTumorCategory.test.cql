library mCodeTNMPathologicalPrimaryTumorCategoryTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Observation":
    singleton from ([Observation] o
        where o.id = 'mCODETNMPathologicalPrimaryTumorCategoryExample01')

define "Test Condition":
    singleton from ([Condition] c
        where c.id = 'conditionId-1')                 

define "Test Is TNM Pathological Primary Tumor Category":
    mCODE."Is TNM Pathological Primary Tumor Category"("Test Observation")   

define "Test Current TNM Pathological Primary Tumor Categories":
    mCODE."Current TNM Pathological Primary Tumor Categories"("Test Condition")    

define "Test Latest TNM Pathological Primary Tumor Categories":
    mCODE."Latest TNM Pathological Primary Tumor Categories"("Test Condition")

define "Test Earliest TNM Pathological Primary Tumor Categories":
    mCODE."Earliest TNM Pathological Primary Tumor Categories"("Test Condition")                 