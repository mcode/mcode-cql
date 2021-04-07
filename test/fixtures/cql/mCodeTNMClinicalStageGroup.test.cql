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

define "Test Is TNM Clinical Stage Group":
    mCODE."Is TNM Clinical Stage Group"("Test Observation")   

define "Test Is TNM Clinical Stage Group False":
    mCODE."Is TNM Clinical Stage Group"(
        singleton from ([Observation] o
            where o.id = 'a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e')
    )       

define "Test Current TNM Clinical Stage Groups":
    mCODE."Current TNM Clinical Stage Groups"("Test Condition")         

define "Test Latest TNM Clinical Stage Group":
    mCODE."Latest TNM Clinical Stage Group"("Test Condition")       

define "Test Earliest TNM Clinical Stage Group":
    mCODE."Earliest TNM Clinical Stage Group"("Test Condition")                 

define "Test TNM Clinical Stage Group Categories":
    mCODE."TNM Clinical Stage Group Categories"("Test Observation")  

define "Test TNM Clinical Stage Group Value":
   mCODE."TNM Clinical Stage Group Value"("Test Observation")  

define "Test TNM Clinical Stage Group Staging System":
   mCODE."TNM Clinical Stage Group Staging System"("Test Observation")  