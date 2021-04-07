library mCodeTNMClinicalPrimaryTumorCategoryTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Observation":
    singleton from ([Observation] o
        where o.id = 'a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e')

define "Test Condition":
    singleton from ([Condition] c
        where c.id = 'conditionId-1')                 

define "Test Is TNM Clinical Primary Tumor Category":
    mCODE."Is TNM Clinical Primary Tumor Category"("Test Observation")   

define "Test Current TNM Clinical Primary Tumor Categories":
    mCODE."Current TNM Clinical Primary Tumor Categories"("Test Condition")    

define "Test Latest TNM Clinical Primary Tumor Categories":
    mCODE."Latest TNM Clinical Primary Tumor Categories"("Test Condition")

define "Test Earliest TNM Clinical Primary Tumor Categories":
    mCODE."Earliest TNM Clinical Primary Tumor Categories"("Test Condition")                 