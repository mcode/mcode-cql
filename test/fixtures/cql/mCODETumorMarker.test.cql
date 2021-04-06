library mCODETumorMarkerTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

context Patient

define "Test Tumor Markers By Value Set":
    mCODE."Tumor Markers By Value Set"(mCODE."TumorMarkerTestVS")

define "Test Tumor Marker Code":
    First ("Test Tumor Markers By Value Set").code 

define "Tumor Marker Data Value":
    First ("Test Tumor Markers By Value Set").value  