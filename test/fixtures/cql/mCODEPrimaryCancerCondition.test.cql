library mCODEPrimaryCancerConditionTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Condition":
    singleton from ([Condition] c
        where c.id = 'conditionId-1')        

define "Test Primary Cancer Condition Body Sites":
    mCODE."Primary Cancer Condition Body Sites"("Test Condition")

define "Test Primary Cancer Condition Body Site Laterality":
    mCODE."Primary Cancer Condition Body Site Laterality"(
        First(mCODE."Primary Cancer Condition Body Sites"("Test Condition"))
    )    

define "Test Primary Cancer Condition Clinical Status":
    mCODE."Primary Cancer Condition Clinical Status"("Test Condition")    

define "Test Primary Cancer Condition Code":
    mCODE."Primary Cancer Condition Code"("Test Condition")    

define "Test Primary Cancer Condition Date of Diagnosis":
    mCODE."Primary Cancer Condition Date of Diagnosis"("Test Condition")

define "Test Primary Cancer Condition Histology Morphology Behavior":
    mCODE."Primary Cancer Condition Histology Morphology Behavior"("Test Condition")

define "Test Primary Cancer Condition Verification Status":
    mCODE."Primary Cancer Condition Verification Status"("Test Condition")         