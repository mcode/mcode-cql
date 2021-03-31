library mCODECancerGeneticVariantTest version '1'

using FHIR version '4.0.0'
include FHIRHelpers version '4.0.0' called FHIRHelpers
include mCODECancerGeneticVariant version '1' called mCODECancerGeneticVariant

define "Test Gene Studied":
    mCODECancerGeneticVariant."Gene Studied"(First(mCODECancerGeneticVariant."Cancer Genetic Variants"))