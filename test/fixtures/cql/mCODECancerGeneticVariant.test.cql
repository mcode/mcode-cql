library mCODECancerGeneticVariantTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODE version '1' called mCODE

define "Test Gene Studied":
    mCODE."Cancer Genetic Variant Gene Studied"(First(mCODE."Cancer Genetic Variants"))