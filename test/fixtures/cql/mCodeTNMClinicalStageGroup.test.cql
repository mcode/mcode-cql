library mCodeTNMClinicalStageGroupTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Observation":
    singleton from ([Observation] o
        where o.id = 'd07680cd7040d712e15f332ffa5d6523843b65dc55ca72b215225252fed7335f')

define "Test Condition":
    singleton from ([Condition] c
        where c.id = 'conditionId-1')        

define "Test Reference id":
    mCODE."Reference id"(("Test Observation" as FHIR.Observation).hasMember[0])           

define "Test is TNM Clinical Stage Group":
    mCODE."is TNM Clinical Stage Group"("Test Observation")   

define "Test Latest TNM Clinical Stage Group":
    mCODE."Latest TNM Clinical Stage Group"("Test Condition")             

define "Test TNM Clinical Stage Group Categories":
    mCODE."TNM Clinical Stage Group Categories"("Test Observation")  