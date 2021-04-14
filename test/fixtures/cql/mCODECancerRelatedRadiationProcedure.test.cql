library mCODECancerRelatedRadiationProcedureTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test CancerRelatedRadiationProcedure":
      singleton from ([Procedure] p
        where p.id = 'c622d837-fdee-4897-9d80-da0091d924c1a')


define "Test CancerRelatedRadiationProcedure Procedure":
    mCODE."Cancer Related Radiation Procedure Procedure" ("Test CancerRelatedRadiationProcedure")


define "Test CancerRelatedRadiationProcedure Treatment Intent":
    mCODE."Cancer Related Radiation Procedure Treatment Intent"("Test CancerRelatedRadiationProcedure") 