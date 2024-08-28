const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  stationId: { type: String, required: true, unique: true },
  stationDistrict: { type: String, required: true },
  stationDivision: { type: String, required: true },
  stationLocation: { type: String, required: true },
  motherVillage: {
    type: Map,
    of: [
      {
        place: { type: String },
        coords: {
          lat: { type: Number },
          lon: { type: Number },
        },
      },
    ],
  },
  defaultStartPoints: [
    {
      place: { type: String },
      coords: {
        lat: { type: Number },
        lon: { type: Number },
      },
    },
  ],
  defaultEndPoints: [
    {
      place: { type: String },
      coords: {
        lat: { type: Number },
        lon: { type: Number },
      },
    },
  ],
  defaultJunctionPoints: [
    {
      place: { type: String },
      coords: {
        lat: { type: Number },
        lon: { type: Number },
      },
    },
  ],
  defaultIntermediateJunctionPoints: [
    {
      place: { type: String },
      coords: {
        lat: { type: Number },
        lon: { type: Number },
      },
    },
  ],
  defaultChurchPoints: [
    {
      place: { type: String },
      coords: {
        lat: { type: Number },
        lon: { type: Number },
      },
    },
  ],
  defaultMosquePoints: [
    {
      place: { type: String },
      coords: {
        lat: { type: Number },
        lon: { type: Number },
      },
    },
  ],
  defaultOrganization: [{ type: String }],
  defaultIdolId: { type: String },
  stationCoords: { lat: { type: Number }, lon: { type: Number } },
  stationIdol: [
    {
      idol_id: { type: String, required: true },
      applicantName: { type: String },
      applicantPhNum: { type: String },
      applicantAddress: { type: String },
      motherVillage: { type: String, required: true },
      hamletVillage: { type: String },
      placeOfInstallation: { type: String },
      placeOfImmersion: { type: String, required: true },
      setupDate: { type: Date },
      immersionDate: { type: Date },
      typeOfInstaller: { type: String },
      licence: { type: String },
      height: { type: Number },
      permission: {
        police: { type: Boolean, default: false },
        fireService: { type: Boolean, default: false },
        TNEB: { type: Boolean, default: false },
      },
      facility: {
        electricalEquipment: { type: Boolean, default: false },
        lightingFacility: { type: Boolean, default: false },
        CCTVFacility: { type: Boolean, default: false },
      },
      property: {
        type: { type: String },
        description: { type: String },
      },
      shed: {
        type: { type: String },
        description: { type: String },
      },
      volunteers: [
        {
          name: { type: String },
          mobileNo: { type: String },
          address: { type: String },
        },
      ],
      modeOfTransport: {
        vehicleType: { type: String },
        vehicleDescription: { type: String },
        driverLicense: { type: String },
        driverName: { type: String },
      },
      processionBy: { type: String },
      route: [{ type: String }],
      startingPoint: { type: String }, //place of installation are same
      organizationName: { type: String },
      immersionSafety: {
        barricade: { type: Boolean, default: false },
        lighting: { type: Boolean, default: false },
        safetyByFireService: { type: Boolean, default: false },
        PASystem: { type: Boolean, default: false },
      },
      isImmersed: { type: Boolean, default: false },
      idolApplication: { type: String }, // File path or URL for idol application
      idolImage: { type: String }, // File path or URL for idol image
      startCoords: { lat: { type: Number }, lon: { type: Number } },
      endCoords: { lat: { type: Number }, lon: { type: Number } },
      hamletCoords: { lat: { type: Number }, lon: { type: Number } },
      startJunctionPoint: {
        place: { type: String },
        coords: { lat: { type: Number }, lon: { type: Number } },
      },
      intermediateJunctionPoints: [
        {
          place: { type: String },
          coords: {
            lat: { type: Number },
            lon: { type: Number },
          },
        },
      ],
      isChurchMosque: { type: String },
      sensitivity: { type: String },
      applicantImage: { type: String }, // URL of the applicant image
      stationName: { type: String },
      stationDivision: { type: String },
      stationDistrict: { type: String },
      createdAt: { type: Date, default: Date.now }, // Timestamp for when the idol is added
    },
  ],
  password: { type: String, required: true },
  dspId: { type: mongoose.Schema.Types.ObjectId, ref: "DSP" }, // Reference to DSP
});

module.exports = mongoose.model("Station", StationSchema);
