library mCodeTNMClinicalDistantMetastasesCategoryTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Observation":
    singleton from ([Observation] o
        where o.id = '72f00994860c396a7905153220ad183b16740c840b3719b46bb200c2061864a3')

define "Test Condition":
    singleton from ([Condition] c
        where c.id = 'conditionId-1')                 

define "Test Is TNM Clinical Distant Metastases Category":
    mCODE."Is TNM Clinical Distant Metastases Category"("Test Observation")   

define "Test Current TNM Clinical Distant Metastases Categories":
    mCODE."Current TNM Clinical Distant Metastases Categories"("Test Condition")    

define "Test Latest TNM Clinical Distant Metastases Categories":
    mCODE."Latest TNM Clinical Distant Metastases Categories"("Test Condition")
             