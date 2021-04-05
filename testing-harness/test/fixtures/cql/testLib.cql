library testLib version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers

valueset "Steam VS": 'SteamVS'

context Patient

// mCODE Profile Statements

define "Condition":
    [Condition : "Steam VS"] 
