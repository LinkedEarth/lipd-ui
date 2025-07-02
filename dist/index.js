'use strict';

var lipdjs = require('lipdjs');
var zustand = require('zustand');
var React = require('react');
var Box = require('@mui/material/Box');
var IconButton = require('@mui/material/IconButton');
var Divider = require('@mui/material/Divider');
var Tooltip = require('@mui/material/Tooltip');
var Breadcrumbs = require('@mui/material/Breadcrumbs');
var Typography6 = require('@mui/material/Typography');
var material = require('@mui/material');
var Dialog = require('@mui/material/Dialog');
var DialogTitle = require('@mui/material/DialogTitle');
var DialogContent = require('@mui/material/DialogContent');
var DialogActions = require('@mui/material/DialogActions');
var xDataGrid = require('@mui/x-data-grid');
var FormControl = require('@mui/material/FormControl');
var mapboxgl = require('mapbox-gl');
require('mapbox-gl/dist/mapbox-gl.css');
var Select = require('@mui/material/Select');
var InputLabel = require('@mui/material/InputLabel');
var Button3 = require('@mui/material/Button');
var DialogContentText = require('@mui/material/DialogContentText');
var SimpleTreeView = require('@mui/x-tree-view/SimpleTreeView');
var TreeItem$1 = require('@mui/x-tree-view/TreeItem');
var LinearProgress = require('@mui/material/LinearProgress');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var Box__default = /*#__PURE__*/_interopDefault(Box);
var IconButton__default = /*#__PURE__*/_interopDefault(IconButton);
var Divider__default = /*#__PURE__*/_interopDefault(Divider);
var Tooltip__default = /*#__PURE__*/_interopDefault(Tooltip);
var Breadcrumbs__default = /*#__PURE__*/_interopDefault(Breadcrumbs);
var Typography6__default = /*#__PURE__*/_interopDefault(Typography6);
var Dialog__default = /*#__PURE__*/_interopDefault(Dialog);
var DialogTitle__default = /*#__PURE__*/_interopDefault(DialogTitle);
var DialogContent__default = /*#__PURE__*/_interopDefault(DialogContent);
var DialogActions__default = /*#__PURE__*/_interopDefault(DialogActions);
var FormControl__default = /*#__PURE__*/_interopDefault(FormControl);
var mapboxgl__default = /*#__PURE__*/_interopDefault(mapboxgl);
var Select__default = /*#__PURE__*/_interopDefault(Select);
var InputLabel__default = /*#__PURE__*/_interopDefault(InputLabel);
var Button3__default = /*#__PURE__*/_interopDefault(Button3);
var DialogContentText__default = /*#__PURE__*/_interopDefault(DialogContentText);
var LinearProgress__default = /*#__PURE__*/_interopDefault(LinearProgress);

// src/schemas.ts

// src/labels.ts
var getPublicationAuthorsLabel = (publication) => {
  return publication.authors.map((author) => author.name).join(", ");
};
var getPublicationTitleLabel = (publication) => {
  return publication.title || "";
};
var getPublicationFullLabel = (publication) => {
  return `${getPublicationTitleLabel(publication)} (${getPublicationAuthorsLabel(publication)})`;
};
var getDataTableLabel = (dataTable) => {
  return dataTable.fileName || "";
};
var getDataTableVariablesLabel = (dataTable) => {
  return dataTable.variables.map((variable) => variable.name).join(", ");
};
var getMeasurementTablesLabel = (data) => {
  return (data.measurementTables?.length.toString() || "0") + " measurement tables";
};
var getModeledByLabel = (data) => {
  return (data.modeledBy?.length.toString() || "0") + " models";
};
var getDataDetailsLabel = (data) => {
  return `${getMeasurementTablesLabel(data)}, ${getModeledByLabel(data)}`;
};
var getPersonNameLabel = (person) => {
  return person.name || "";
};
var getVariableNameLabel = (variable) => {
  return variable.name || "";
};
var getVariableDescriptionLabel = (variable) => {
  return variable.description || "";
};
var getVariableUnitsLabel = (variable) => {
  return variable.units?.getLabel() || "";
};
var getFundingLabel = (funding) => {
  return funding.fundingAgency || "";
};
var getFundingGrantsLabel = (funding) => {
  return (funding.grants || []).join(", ");
};
var getChangeLogLabel = (changeLog) => {
  return changeLog.timestamp || "";
};
var getChangeLogCuratorLabel = (changeLog) => {
  return changeLog.curator || "";
};
var getChangeLogEntryLabel = (changeLogEntry) => {
  return changeLogEntry.name || "";
};
var getCompilationNameLabel = (compilation) => {
  return compilation.name || "";
};

// src/schemas.ts
var getUniqueLabels = (category, className) => {
  const categoryObj = lipdjs.SYNONYMS[category];
  if (!categoryObj)
    return {};
  const synonyms = categoryObj[className];
  if (!synonyms)
    return {};
  const uniqueLabels = {};
  Object.values(synonyms).forEach((entry) => {
    if (entry?.id) {
      uniqueLabels[entry.id] = entry;
    }
  });
  return uniqueLabels;
};
var archiveTypeSchema = {
  enum: getUniqueLabels("ARCHIVES", "ArchiveType"),
  class: lipdjs.ArchiveType
};
var proxySchema = {
  enum: getUniqueLabels("PROXIES", "PaleoProxy"),
  class: lipdjs.PaleoProxy
};
var proxyGeneralSchema = {
  enum: getUniqueLabels("PROXIES", "PaleoProxyGeneral"),
  class: lipdjs.PaleoProxyGeneral
};
var interpretationVariableSchema = {
  enum: getUniqueLabels("INTERPRETATION", "InterpretationVariable"),
  class: lipdjs.InterpretationVariable
};
var seasonalitySchema = {
  enum: getUniqueLabels("INTERPRETATION", "InterpretationSeasonality"),
  class: lipdjs.InterpretationSeasonality
};
var seasonalityGeneralSchema = {
  enum: getUniqueLabels("INTERPRETATION", "InterpretationSeasonality"),
  class: lipdjs.InterpretationSeasonality
};
var seasonalityOriginalSchema = {
  enum: getUniqueLabels("INTERPRETATION", "InterpretationSeasonality"),
  class: lipdjs.InterpretationSeasonality
};
var paleoUnitSchema = {
  enum: getUniqueLabels("UNITS", "PaleoUnit"),
  class: lipdjs.PaleoUnit
};
var paleoVariableSchema = {
  enum: getUniqueLabels("VARIABLES", "PaleoVariable"),
  class: lipdjs.PaleoVariable
};
var locationSchema = {
  fields: {
    latitude: { type: "string", label: "Latitude" },
    longitude: { type: "string", label: "Longitude" },
    elevation: { type: "string", label: "Elevation" },
    siteName: { type: "string", label: "Site Name" },
    description: { type: "string", label: "Description" },
    continent: { type: "string", label: "Continent" },
    country: { type: "string", label: "Country" },
    countryOcean: { type: "string", label: "Country Ocean" },
    ocean: { type: "string", label: "Ocean" }
    // locationName: { type: 'string', label: 'Location Name' },
    // locationType: { type: 'string', label: 'Location Type' }
  },
  class: lipdjs.Location
};
var personSchema = {
  fields: {
    name: { type: "string", label: "Name" }
  },
  label: {
    primary: getPersonNameLabel
  },
  class: lipdjs.Person
};
var publicationSchema = {
  fields: {
    title: { type: "string", label: "Title" },
    authors: {
      type: "array",
      label: "Authors",
      items: {
        type: "object",
        label: "Author",
        schema: personSchema
      }
    },
    year: { type: "number", label: "Year" },
    abstract: { type: "string", label: "Abstract" },
    firstAuthor: {
      type: "object",
      hidden: true,
      label: "First Author",
      schema: personSchema
    },
    dOI: { type: "string", label: "DOI" },
    journal: { type: "string", label: "Journal" },
    volume: { type: "string", label: "Volume" },
    issue: { type: "string", label: "Issue" },
    pages: { type: "string", label: "Pages" },
    publisher: { type: "string", label: "Publisher" },
    citation: { type: "string", label: "Citation" },
    citeKey: { type: "string", label: "Cite Key" },
    institution: { type: "string", label: "Institution" },
    publicationType: { type: "string", label: "Publication Type" },
    report: { type: "string", label: "Report" },
    urls: {
      type: "array",
      label: "URLs",
      items: {
        type: "string",
        label: "URL"
      }
    },
    dataUrls: {
      type: "array",
      label: "Data URLs",
      items: {
        type: "string",
        label: "URL"
      }
    }
  },
  label: {
    primary: getPublicationTitleLabel,
    secondary: getPublicationAuthorsLabel
  },
  class: lipdjs.Publication
};
var changeLogEntrySchema = {
  fields: {
    name: { type: "string", label: "Name" },
    notes: {
      type: "array",
      label: "Notes",
      items: {
        type: "string",
        label: "Note"
      }
    }
  },
  label: {
    primary: getChangeLogEntryLabel
  },
  class: lipdjs.Change
};
var changeLogSchema = {
  fields: {
    curator: { type: "string", label: "Curator" },
    timestamp: { type: "string", label: "Timestamp" },
    version: { type: "string", label: "Version" },
    lastVersion: { type: "string", label: "Last Version" },
    notes: { type: "string", label: "Notes" },
    changes: {
      type: "array",
      label: "Changes",
      items: {
        type: "object",
        label: "Change",
        schema: changeLogEntrySchema
      }
    }
  },
  label: {
    primary: getChangeLogLabel,
    secondary: getChangeLogCuratorLabel
  },
  class: lipdjs.ChangeLog
};
var fundingSchema = {
  fields: {
    fundingAgency: { type: "string", label: "Funding Agency" },
    fundingCountry: { type: "string", label: "Funding Country" },
    grants: {
      type: "array",
      label: "Grants",
      items: {
        type: "string",
        label: "Grant"
      }
    },
    investigators: {
      type: "array",
      label: "Investigators",
      items: {
        type: "object",
        label: "Investigator",
        schema: personSchema
      }
    }
  },
  label: {
    primary: getFundingLabel,
    secondary: getFundingGrantsLabel
  },
  class: lipdjs.Funding
};
var interpretationSchema = {
  fields: {
    basis: { type: "string", label: "Basis" },
    direction: { type: "string", label: "Direction" },
    local: { type: "string", label: "Local" },
    notes: { type: "string", label: "Notes" },
    rank: { type: "string", label: "Rank" },
    scope: { type: "string", label: "Scope" },
    variable: {
      type: "enum",
      label: "Interpretation Variable",
      schema: interpretationVariableSchema
    },
    variableDetail: { type: "string", label: "Variable Detail" },
    variableGeneral: { type: "string", label: "Variable General" },
    variableGeneralDirection: { type: "string", label: "Variable General Direction" },
    seasonality: {
      type: "enum",
      label: "Seasonality",
      schema: seasonalitySchema
    },
    seasonalityGeneral: {
      type: "enum",
      label: "Seasonality General",
      schema: seasonalitySchema
    },
    seasonalityOriginal: {
      type: "enum",
      label: "Seasonality Original",
      schema: seasonalitySchema
    }
  },
  class: lipdjs.Interpretation
};
var calibrationSchema = {
  fields: {
    dOI: { type: "string", label: "DOI" },
    datasetRange: { type: "string", label: "Dataset Range" },
    equation: { type: "string", label: "Equation" },
    equationIntercept: { type: "string", label: "Equation Intercept" },
    equationR2: { type: "string", label: "Equation R2" },
    equationSlope: { type: "string", label: "Equation Slope" },
    equationSlopeUncertainty: { type: "string", label: "Equation Slope Uncertainty" },
    method: { type: "string", label: "Method" },
    methodDetail: { type: "string", label: "Method Detail" },
    notes: { type: "string", label: "Notes" },
    proxyDataset: { type: "string", label: "Proxy Dataset" },
    seasonality: { type: "string", label: "Seasonality" },
    targetDataset: { type: "string", label: "Target Dataset" },
    uncertainty: { type: "string", label: "Uncertainty" }
  },
  class: lipdjs.Calibration
};
var resolutionSchema = {
  fields: {
    maxValue: { type: "number", label: "Max Value" },
    meanValue: { type: "number", label: "Mean Value" },
    medianValue: { type: "number", label: "Median Value" },
    minValue: { type: "number", label: "Min Value" },
    units: { type: "enum", label: "Units", schema: paleoUnitSchema }
  },
  class: lipdjs.Resolution
};
var compilationSchema = {
  fields: {
    name: { type: "string", label: "Name" },
    version: { type: "string", label: "Version" }
  },
  label: {
    primary: getCompilationNameLabel
  },
  class: lipdjs.Compilation
};
var variableSchema = {
  fields: {
    name: { type: "string", label: "Name" },
    standardVariable: {
      type: "enum",
      label: "Standard Variable",
      schema: paleoVariableSchema
    },
    variableId: { type: "string", label: "Variable ID" },
    description: { type: "string", label: "Description" },
    notes: { type: "string", label: "Notes" },
    units: { type: "enum", label: "Units", schema: paleoUnitSchema },
    archiveType: {
      type: "enum",
      label: "Archive Type",
      schema: archiveTypeSchema
    },
    columnNumber: { type: "number", label: "Column Number" },
    variableType: { type: "string", label: "Variable Type" },
    partOfCompilations: {
      type: "array",
      label: "Part of Compilations",
      items: {
        type: "object",
        label: "Compilation",
        schema: compilationSchema
      }
    },
    missingValue: { type: "string", label: "Missing Value" },
    maxValue: { type: "number", label: "Max Value" },
    meanValue: { type: "number", label: "Mean Value" },
    medianValue: { type: "number", label: "Median Value" },
    minValue: { type: "number", label: "Min Value" },
    primary: { type: "boolean", label: "Primary" },
    uncertainty: { type: "string", label: "Uncertainty" },
    uncertaintyAnalytical: { type: "string", label: "Analytical Uncertainty" },
    uncertaintyReproducibility: { type: "string", label: "Reproducibility Uncertainty" },
    composite: { type: "boolean", label: "Composite" },
    instrument: { type: "string", label: "Instrument" },
    proxy: {
      type: "enum",
      label: "Proxy",
      schema: proxySchema
    },
    proxyGeneral: {
      type: "enum",
      label: "Proxy General",
      schema: proxyGeneralSchema
    },
    resolution: {
      type: "object",
      label: "Resolution",
      schema: resolutionSchema
    },
    interpretations: {
      type: "array",
      label: "Interpretations",
      items: {
        type: "object",
        label: "Interpretation",
        schema: interpretationSchema
      }
    },
    calibratedVias: {
      type: "array",
      label: "Calibration",
      items: {
        type: "object",
        label: "Calibration",
        schema: calibrationSchema
      }
    }
  },
  label: {
    primary: getVariableNameLabel,
    secondary: getVariableDescriptionLabel
  },
  class: lipdjs.Variable
};
var dataTableSchema = {
  fields: {
    fileName: { type: "string", label: "File Name" },
    missingValue: { type: "string", label: "Missing Value" },
    variables: {
      type: "array",
      label: "Variables",
      items: {
        type: "object",
        label: "Variable",
        schema: variableSchema
      }
    }
  },
  label: {
    primary: getDataTableLabel,
    secondary: getDataTableVariablesLabel
  },
  class: lipdjs.DataTable
};
var modelSchema = {
  fields: {
    code: { type: "string", label: "Code", multiline: true, rows: 4 },
    ensembleTables: {
      type: "array",
      label: "Ensemble Tables",
      items: {
        type: "object",
        label: "Ensemble Table",
        schema: dataTableSchema
      }
    },
    summaryTables: {
      type: "array",
      label: "Summary Tables",
      items: {
        type: "object",
        label: "Summary Table",
        schema: dataTableSchema
      }
    },
    distributionTables: {
      type: "array",
      label: "Distribution Tables",
      items: {
        type: "object",
        label: "Distribution Table",
        schema: dataTableSchema
      }
    }
  },
  class: lipdjs.Model
};
var dataSchema = {
  fields: {
    // name: { type: 'string', label: 'Name' },
    // Measurement Tables and modeledBy are handled in the PaleoDataEditor component
    measurementTables: {
      type: "array",
      label: "Measurement Tables",
      items: {
        type: "object",
        label: "Measurement Table",
        schema: dataTableSchema
      }
    },
    modeledBy: {
      type: "array",
      label: "Models",
      items: {
        type: "object",
        label: "Model",
        schema: modelSchema
      }
    }
  },
  label: {
    secondary: getDataDetailsLabel
  },
  class: lipdjs.PaleoData
};
var datasetSchema = {
  fields: {
    name: { type: "string", label: "Dataset Name" },
    archiveType: {
      type: "enum",
      label: "Archive Type",
      schema: archiveTypeSchema
    },
    location: {
      hidden: true,
      type: "object",
      label: "Location",
      schema: locationSchema
    },
    datasetId: { type: "string", label: "Dataset ID" },
    version: { type: "string", label: "Version" },
    collectionName: { type: "string", label: "Collection Name" },
    collectionYear: { type: "string", label: "Collection Year" },
    dataSource: { type: "string", label: "Data Source" },
    originalDataUrl: { type: "string", label: "Original Data URL" },
    spreadsheetLink: { type: "string", label: "Spreadsheet Link" },
    compilationNest: { type: "string", label: "Compilation Nest" },
    notes: { type: "string", label: "Notes" },
    investigators: {
      type: "array",
      label: "Investigators",
      items: {
        type: "object",
        label: "Investigator",
        schema: personSchema
      }
    },
    creators: {
      type: "array",
      label: "Creators",
      items: {
        type: "object",
        label: "Creator",
        schema: personSchema
      }
    },
    contributors: {
      type: "array",
      label: "Contributors",
      items: {
        type: "object",
        label: "Contributor",
        schema: personSchema
      }
    },
    fundings: {
      type: "array",
      label: "Fundings",
      items: {
        type: "object",
        label: "Funding",
        schema: fundingSchema
      }
    },
    changeLogs: {
      type: "array",
      hidden: true,
      label: "ChangeLog",
      items: {
        type: "object",
        label: "ChangeLog Entry",
        schema: changeLogSchema
      }
    },
    publications: {
      type: "array",
      hidden: true,
      label: "Publications",
      items: {
        type: "object",
        label: "Publication",
        schema: publicationSchema
      }
    },
    paleoData: {
      type: "array",
      hidden: true,
      label: "PaleoData",
      items: {
        type: "object",
        label: "PaleoData",
        schema: dataSchema
      }
    },
    chronData: {
      type: "array",
      hidden: true,
      label: "ChronData",
      items: {
        type: "object",
        label: "ChronData",
        schema: dataSchema
      }
    }
  },
  class: lipdjs.Dataset
};
var schemaPathMap = /* @__PURE__ */ new Map();
var buildSchemaPathMap = (schema, fieldSchema, currentPath = "dataset") => {
  if (schema) {
    schemaPathMap.set(currentPath, schema);
    if (schema.fields) {
      Object.entries(schema.fields).forEach(([fieldName, fieldDef]) => {
        const fieldPath = `${currentPath}.${fieldName}`;
        schemaPathMap.set(fieldPath, fieldDef);
        if (fieldDef.type === "object" && fieldDef.schema) {
          buildSchemaPathMap(fieldDef.schema, fieldDef, fieldPath);
        } else if (fieldDef.type === "array" && fieldDef.items) {
          schemaPathMap.set(fieldPath, fieldDef);
          const itemPath = `${fieldPath}.*`;
          schemaPathMap.set(itemPath, fieldDef.items);
          if (fieldDef.items.schema) {
            buildSchemaPathMap(fieldDef.items.schema, fieldDef.items, itemPath);
          }
        }
      });
    }
  } else if (fieldSchema) {
    schemaPathMap.set(currentPath, fieldSchema);
    if (fieldSchema.type === "object" && fieldSchema.schema) {
      buildSchemaPathMap(fieldSchema.schema, void 0, currentPath);
    } else if (fieldSchema.type === "array" && fieldSchema.items) {
      const itemPath = `${currentPath}.*`;
      schemaPathMap.set(itemPath, fieldSchema.items);
      if (fieldSchema.items.schema) {
        buildSchemaPathMap(fieldSchema.items.schema, fieldSchema.items, itemPath);
      }
    }
  }
};
buildSchemaPathMap(datasetSchema, void 0);
var getSchemaForPath = (path) => {
  if (schemaPathMap.has(path)) {
    return schemaPathMap.get(path);
  }
  let wildcardPath = path.replace(/\.\d+/g, ".*");
  if (schemaPathMap.has(wildcardPath)) {
    return schemaPathMap.get(wildcardPath);
  }
  return null;
};

// src/vscode.ts
var vscodeApi;
function getVSCodeAPI() {
  if (window && window.__vscodeApi) {
    vscodeApi = window.__vscodeApi;
    return vscodeApi;
  }
  if (!vscodeApi) {
    try {
      vscodeApi = acquireVsCodeApi();
      vscodeApi.postMessage({ type: "ready" });
      if (window) {
        window.__vscodeApi = vscodeApi;
      }
    } catch {
      vscodeApi = {
        postMessage: () => {
        },
        getState: () => void 0,
        setState: () => {
        }
      };
    }
  }
  return vscodeApi;
}

// src/store.tsx
var vscode = getVSCodeAPI();
var useLiPDStore = zustand.create((set, get) => ({
  dataset: null,
  isLoading: false,
  isSaving: false,
  isSyncing: false,
  isRemote: false,
  datasetName: "",
  syncProgress: 0,
  canUndo: false,
  canRedo: false,
  selectedNode: null,
  expandedNodes: /* @__PURE__ */ new Set(["dataset"]),
  rightPanelOpen: true,
  selectedTab: 0,
  themeMode: "light",
  validationErrors: {},
  validationWarnings: {},
  notification: null,
  readonly: false,
  syncConfirmDialogOpen: false,
  initialize: () => {
  },
  setIsLoading: (v) => set({ isLoading: v }),
  setLoadingMessage: (m) => set({ loadingMessage: m }),
  setThemeMode: (mode) => set({ themeMode: mode }),
  setDataset: (d) => set({ dataset: d, selectedNode: "dataset" }),
  setDatasetSilently: (d) => set({ dataset: d }),
  undo: () => vscode.postMessage?.({ type: "executeCommand", command: "lipd-vscode.undo" }),
  redo: () => vscode.postMessage?.({ type: "executeCommand", command: "lipd-vscode.redo" }),
  setUndoRedoState: (u, r) => set({ canUndo: u, canRedo: r }),
  setSelectedNode: (n) => set({ selectedNode: n }),
  toggleExpandNode: (id) => {
    const s = get().expandedNodes;
    const ns = new Set(s);
    ns.has(id) ? ns.delete(id) : ns.add(id);
    set({ expandedNodes: ns });
  },
  setError: (e) => set({ validationErrors: { error: e }, notification: { type: "error", message: e } }),
  setSaveComplete: (s, err) => set({ isSaving: false, notification: s ? { type: "success", message: "Dataset saved successfully" } : { type: "error", message: err || "Failed to save dataset" } }),
  setSyncComplete: (s, err) => set({ isSyncing: false, syncProgress: 0, notification: s ? { type: "success", message: "Dataset synced" } : { type: "error", message: err || "Failed to sync" } }),
  setValidationResults: (res) => set({ validationErrors: res.errors || {}, validationWarnings: res.warnings || {} }),
  saveDataset: () => {
    set({ isSaving: true });
    vscode.postMessage?.({ type: "save" });
    return Promise.resolve();
  },
  saveDatasetAs: () => {
    set({ isSaving: true });
    vscode.postMessage?.({ type: "executeCommand", command: "workbench.action.files.saveAs" });
    return Promise.resolve();
  },
  syncDataset: () => {
    set({ syncConfirmDialogOpen: true });
    return Promise.resolve();
  },
  setSyncConfirmDialogOpen: (open) => set({ syncConfirmDialogOpen: open }),
  confirmSync: () => {
    set({ syncConfirmDialogOpen: false, isSyncing: true });
    vscode.postMessage?.({ type: "sync" });
    return Promise.resolve();
  },
  toggleRightPanel: () => set({ rightPanelOpen: !get().rightPanelOpen }),
  setSelectedTab: (t) => set({ selectedTab: t }),
  updateDataset: (field, value) => {
    const original = get().dataset;
    if (!original)
      return;
    const dataset = original;
    const updateNestedProperty = (obj, path, value2) => {
      if (typeof path === "string") {
        const parts = path.split(".");
        const lastKey = parts.pop();
        if (parts.length > 0 && parts[0] === "dataset") {
          parts.shift();
        }
        let current = obj;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (!current[part]) {
            const pathToHere = ["dataset", ...parts.slice(0, i + 1)].join(".");
            const schema = getSchemaForPath(pathToHere);
            if (schema) {
              if (parts[i + 1] && !isNaN(Number(parts[i + 1]))) {
                current[part] = [];
              } else if ("class" in schema && schema.class) {
                current[part] = new schema.class();
              } else if ("type" in schema && schema.type === "array" && "items" in schema && schema.items) {
                current[part] = [];
              } else {
                current[part] = {};
              }
            } else {
              current[part] = {};
            }
          }
          current = current[part];
        }
        current[lastKey] = value2;
      } else if (Array.isArray(path) && path.length === 1) {
        obj[path[0]] = value2;
      } else {
        console.error("Invalid path format", path);
      }
      return obj;
    };
    updateNestedProperty(dataset, field, value);
    const cloned = Object.assign(Object.create(Object.getPrototypeOf(dataset)), dataset);
    set({ dataset: cloned });
    vscode.postMessage({
      type: "datasetUpdated",
      data: cloned
    });
  },
  setExpandedNodes: (nodes) => set({ expandedNodes: nodes }),
  setIsRemote: (b) => set({ isRemote: b }),
  setDatasetName: (n) => set({ datasetName: n }),
  setReadonly: (readonly) => set({ readonly })
}));
var getIconSize = (fontSize = "medium") => {
  switch (fontSize) {
    case "small":
      return "16px";
    case "large":
      return "20px";
    default:
      return "18px";
  }
};
var ArrowBackIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z" })
  );
};
var NavigateNextIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })
  );
};
var HomeIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" })
  );
};
var SaveIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" })
  );
};
var SaveAsIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M12 3L12 16" }),
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M7 11L12 16L17 11" }),
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M4 18L4 20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22L18 22C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20L20 18" })
  );
};
var UndoIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" })
  );
};
var RedoIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 15.5c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 15h9V6l-3.6 4.6z" })
  );
};
var SyncIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" })
  );
};
var AddIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })
  );
};
var EditIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" })
  );
};
var DeleteIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" })
  );
};
var ExpandMoreIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" })
  );
};
var ChevronRightIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" })
  );
};
var DescriptionIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" })
  );
};
var TableChartIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" })
  );
};
var FolderIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" })
  );
};
var ArticleIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" })
  );
};
var TableRowsIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M21 8c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1zM4 13h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm16 2H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1z" })
  );
};
var CheckIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" })
  );
};
var FileUploadIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7l-4-4-4 4h3v4h2v-4h3z" })
  );
};
var FileDownloadIcon = ({ fontSize = "medium", sx, style, ...props }) => {
  const size = getIconSize(fontSize);
  return /* @__PURE__ */ React__default.default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: { ...style, ...sx && typeof sx === "object" ? sx : {} },
      ...props
    },
    /* @__PURE__ */ React__default.default.createElement("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" })
  );
};

// src/components/AppBarActions.tsx
var AppBarActions = () => {
  const { saveDataset, saveDatasetAs, syncDataset, undo, redo, isSaving, isSyncing, canUndo, canRedo, isRemote } = useLiPDStore((state) => ({
    saveDataset: state.saveDataset,
    saveDatasetAs: state.saveDatasetAs,
    syncDataset: state.syncDataset,
    undo: state.undo,
    redo: state.redo,
    isSaving: state.isSaving,
    isSyncing: state.isSyncing,
    canUndo: state.canUndo,
    canRedo: state.canRedo,
    isRemote: state.isRemote
  }));
  return /* @__PURE__ */ React__default.default.createElement(Box__default.default, { sx: { display: "flex", alignItems: "center" } }, /* @__PURE__ */ React__default.default.createElement(Box__default.default, { sx: { display: "flex", mr: 2 } }, /* @__PURE__ */ React__default.default.createElement(Tooltip__default.default, { title: "Undo (VS Code Cmd+Z / Ctrl+Z)" }, /* @__PURE__ */ React__default.default.createElement("span", null, /* @__PURE__ */ React__default.default.createElement(
    IconButton__default.default,
    {
      onClick: undo,
      disabled: !canUndo || isSaving,
      size: "small",
      "aria-label": "Undo",
      sx: { mr: 0.5 }
    },
    /* @__PURE__ */ React__default.default.createElement(UndoIcon, { fontSize: "small" })
  ))), /* @__PURE__ */ React__default.default.createElement(Tooltip__default.default, { title: "Redo (VS Code Cmd+Shift+Z / Ctrl+Y)" }, /* @__PURE__ */ React__default.default.createElement("span", null, /* @__PURE__ */ React__default.default.createElement(
    IconButton__default.default,
    {
      onClick: redo,
      disabled: !canRedo || isSaving,
      size: "small",
      "aria-label": "Redo"
    },
    /* @__PURE__ */ React__default.default.createElement(RedoIcon, { fontSize: "small" })
  )))), /* @__PURE__ */ React__default.default.createElement(Divider__default.default, { orientation: "vertical", flexItem: true, sx: { mx: 1 } }), /* @__PURE__ */ React__default.default.createElement(Box__default.default, { sx: { display: "flex", alignItems: "center", ml: 1 } }, /* @__PURE__ */ React__default.default.createElement(Tooltip__default.default, { title: "Save (VS Code Cmd+S / Ctrl+S)" }, /* @__PURE__ */ React__default.default.createElement(
    IconButton__default.default,
    {
      onClick: saveDataset,
      disabled: isSaving,
      size: "small",
      "aria-label": "Save",
      sx: { mr: 1 }
    },
    /* @__PURE__ */ React__default.default.createElement(SaveIcon, { fontSize: "small" })
  )), /* @__PURE__ */ React__default.default.createElement(Tooltip__default.default, { title: "Save As (VS Code Cmd+Shift+S / Ctrl+Shift+S)" }, /* @__PURE__ */ React__default.default.createElement(
    IconButton__default.default,
    {
      onClick: saveDatasetAs,
      disabled: isSaving,
      size: "small",
      "aria-label": "Save",
      sx: { mr: 1 }
    },
    /* @__PURE__ */ React__default.default.createElement(SaveAsIcon, { fontSize: "small" })
  )), /* @__PURE__ */ React__default.default.createElement(Tooltip__default.default, { title: "Sync to GraphDB" }, /* @__PURE__ */ React__default.default.createElement(
    IconButton__default.default,
    {
      onClick: syncDataset,
      disabled: isSyncing,
      size: "small",
      "aria-label": "Sync to GraphDB",
      sx: { mr: 1 }
    },
    /* @__PURE__ */ React__default.default.createElement(SyncIcon, { fontSize: "small" })
  ))));
};
var AppBarActions_default = AppBarActions;
var Fieldset = ({ children, dense = false }) => /* @__PURE__ */ React__default.default.createElement(
  material.Box,
  {
    component: "fieldset",
    sx: {
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 1,
      px: dense ? 0 : 1,
      mt: 1,
      "& legend": {
        color: "text.secondary",
        fontSize: "0.75rem",
        fontWeight: 400,
        ml: 1,
        "& .MuiButton-root": {
          fontSize: "0.75rem",
          borderRadius: 1,
          color: "inherit",
          "&:hover": {
            bgcolor: "action.hover"
          }
        },
        "& .MuiSvgIcon-root": {
          fontSize: "0.75rem"
        }
      }
    }
  },
  children
);

// src/utils/utils.ts
var formVariant = "standard";
var getValueFromPath = (dataset, path) => {
  if (!path)
    return dataset;
  const parts = path.split(".");
  parts.shift();
  let current = dataset;
  for (const part of parts) {
    if (!current || current[part] === void 0) {
      return null;
    }
    current = current[part];
  }
  return current;
};
var createDefaultItem = (objectSchema, fieldSchema) => {
  if (objectSchema) {
    const obj = new objectSchema.class();
    Object.entries(objectSchema.fields || {}).forEach(([key, propSchema]) => {
      obj[key] = createDefaultItem(propSchema.schema, propSchema);
    });
    return obj;
  } else if (fieldSchema) {
    if (fieldSchema.type === "object" && fieldSchema.schema) {
      const obj = new fieldSchema.schema.class();
      Object.entries(fieldSchema.schema.fields || {}).forEach(([key, propSchema]) => {
        obj[key] = createDefaultItem(propSchema.schema, propSchema);
      });
      return obj;
    }
    return getDefaultValueForType(fieldSchema);
  } else {
    return {};
  }
};
var getDefaultValueForType = (schema) => {
  switch (schema.type) {
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return null;
  }
};

// src/components/ListView.tsx
var ListView = ({
  title,
  items,
  schema,
  onAdd,
  onEdit,
  onDelete,
  addButtonText,
  pathPrefix,
  dense = true,
  useFieldset = true,
  fieldSchema = {},
  readonly = false
}) => {
  const setSelectedNode = useLiPDStore((state) => state.setSelectedNode);
  const [editIndex, setEditIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState("");
  const [addingNew, setAddingNew] = React.useState(false);
  const [newItemValue, setNewItemValue] = React.useState("");
  const isSimpleList = !schema;
  const handleEdit = (index) => {
    if (typeof items[index] !== "object") {
      setEditIndex(index);
      setEditValue(String(items[index]));
    } else if (pathPrefix) {
      setSelectedNode(`${pathPrefix}.${index}`);
    } else ;
  };
  const handleSave = (index) => {
    [...items];
    if (typeof items[index] !== "object" && pathPrefix) {
      const path = `${pathPrefix}.${index}`;
      const updateDataset = useLiPDStore.getState().updateDataset;
      updateDataset(path, editValue);
    } else {
      onEdit(index);
    }
    setEditIndex(null);
  };
  const handleAddNew = () => {
    if (isSimpleList) {
      setAddingNew(true);
      setNewItemValue("");
    } else {
      onAdd?.();
    }
  };
  const handleSaveNewItem = () => {
    if (pathPrefix && newItemValue.trim() !== "") {
      const updatedItems = [...items, newItemValue];
      const updateDataset = useLiPDStore.getState().updateDataset;
      updateDataset(pathPrefix, updatedItems);
      setAddingNew(false);
      setNewItemValue("");
    }
  };
  const handleDelete = (index, e) => {
    e.stopPropagation();
    onDelete?.(index);
  };
  const content = /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, null, /* @__PURE__ */ React__default.default.createElement(material.List, { dense, sx: { width: "100%", p: 0 } }, (items || []).map((item, index) => {
    let primary = schema?.label?.primary ? schema.label.primary(item) : "Item " + (index + 1);
    let secondary = schema?.label?.secondary ? schema.label.secondary(item) : "";
    if (!primary) {
      primary = "Unnamed";
    }
    const isSimpleValue = typeof item !== "object";
    if (isSimpleValue) {
      primary = String(item);
    }
    return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, { key: index }, index > 0 && /* @__PURE__ */ React__default.default.createElement(material.Divider, null), /* @__PURE__ */ React__default.default.createElement(
      material.ListItem,
      {
        onClick: () => isSimpleValue ? null : handleEdit(index),
        sx: {
          cursor: isSimpleValue ? "default" : "pointer",
          "&:hover": {
            backgroundColor: "action.hover"
          }
        },
        secondaryAction: !readonly ? /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { display: "flex" } }, editIndex === index ? /* @__PURE__ */ React__default.default.createElement(
          material.IconButton,
          {
            edge: "end",
            "aria-label": "save",
            onClick: () => handleSave(index),
            size: dense ? "small" : "medium"
          },
          /* @__PURE__ */ React__default.default.createElement(CheckIcon, { sx: { fontSize: dense ? 16 : 24 } })
        ) : isSimpleValue ? /* @__PURE__ */ React__default.default.createElement(
          material.IconButton,
          {
            edge: "end",
            "aria-label": "edit",
            onClick: () => handleEdit(index),
            size: dense ? "small" : "medium"
          },
          /* @__PURE__ */ React__default.default.createElement(EditIcon, { sx: { fontSize: dense ? 16 : 24 } })
        ) : null, /* @__PURE__ */ React__default.default.createElement(
          material.IconButton,
          {
            edge: "end",
            "aria-label": "delete",
            onClick: (e) => handleDelete(index, e),
            size: dense ? "small" : "medium"
          },
          /* @__PURE__ */ React__default.default.createElement(DeleteIcon, { sx: { fontSize: dense ? 16 : 24 } })
        )) : null
      },
      editIndex === index ? /* @__PURE__ */ React__default.default.createElement(
        material.TextField,
        {
          value: editValue,
          onChange: (e) => setEditValue(e.target.value),
          variant: formVariant,
          size: "small",
          fullWidth: true,
          autoFocus: true,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              handleSave(index);
            } else if (e.key === "Escape") {
              setEditIndex(null);
            }
          }
        }
      ) : /* @__PURE__ */ React__default.default.createElement(
        material.ListItemText,
        {
          primaryTypographyProps: {
            fontSize: dense ? "0.9rem" : "1.2rem"
          },
          secondaryTypographyProps: {
            fontSize: dense ? "0.8rem" : "0.9rem"
          },
          primary,
          secondary
        }
      )
    ));
  }), !readonly && addingNew && /* @__PURE__ */ React__default.default.createElement(material.ListItem, null, /* @__PURE__ */ React__default.default.createElement(
    material.TextField,
    {
      value: newItemValue,
      onChange: (e) => setNewItemValue(e.target.value),
      variant: formVariant,
      size: "small",
      fullWidth: true,
      autoFocus: true,
      placeholder: "Enter new item",
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          handleSaveNewItem();
        } else if (e.key === "Escape") {
          setAddingNew(false);
        }
      },
      InputProps: {
        endAdornment: /* @__PURE__ */ React__default.default.createElement(
          material.IconButton,
          {
            size: "small",
            onClick: handleSaveNewItem
          },
          /* @__PURE__ */ React__default.default.createElement(CheckIcon, { fontSize: "small" })
        )
      }
    }
  ))));
  if (useFieldset) {
    return /* @__PURE__ */ React__default.default.createElement(Fieldset, { dense }, /* @__PURE__ */ React__default.default.createElement("legend", null, title, !readonly && /* @__PURE__ */ React__default.default.createElement(
      material.Button,
      {
        onClick: handleAddNew,
        startIcon: /* @__PURE__ */ React__default.default.createElement(AddIcon, null)
      },
      addButtonText
    )), content);
  }
  return content;
};
var ListView_default = ListView;
var FormTextField = React__default.default.memo(({
  label,
  defaultValue,
  type,
  multiline,
  rows,
  onBlur,
  disabled = false
}) => {
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState(defaultValue?.toString() || "");
  const lastUpdateRef = React.useRef(defaultValue?.toString() || "");
  React.useEffect(() => {
    setValue(defaultValue?.toString() || "");
    lastUpdateRef.current = defaultValue?.toString() || "";
  }, [defaultValue]);
  const handleUpdate = (newValue) => {
    if (newValue !== defaultValue?.toString() && newValue !== lastUpdateRef.current) {
      lastUpdateRef.current = newValue;
      onBlur(newValue);
    }
  };
  if (disabled) {
    if (value === void 0 || value === null || value.toString().trim() === "")
      return null;
    return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { py: 0.5 } }, /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "caption", color: "text.secondary", sx: { mr: 1 } }, label, ":"), typeof value === "string" && value.match(/^https?:\/\//) ? /* @__PURE__ */ React__default.default.createElement(material.Link, { href: value, target: "_blank", rel: "noopener noreferrer" }, value) : /* @__PURE__ */ React__default.default.createElement(material.Typography, { component: "span" }, value));
  }
  return /* @__PURE__ */ React__default.default.createElement(FormControl__default.default, { variant: formVariant, sx: { mt: 1, width: "100%" } }, /* @__PURE__ */ React__default.default.createElement(
    material.TextField,
    {
      inputRef,
      label,
      value,
      variant: formVariant,
      onChange: (e) => setValue(e.target.value),
      onBlur: () => {
        if (inputRef.current) {
          handleUpdate(inputRef.current.value);
        }
      },
      onKeyDown: (e) => {
        if (e.key === "Enter" && inputRef.current) {
          handleUpdate(inputRef.current.value);
          inputRef.current.blur();
        }
      },
      fullWidth: true,
      size: "small",
      margin: "dense",
      type,
      multiline,
      rows,
      sx: { width: "100%" }
    }
  ));
});

// src/components/DataTableEditor.tsx
var DataTableEditor = ({ path, params, onUpdate, title = "", readonly = false }) => {
  const dataset = useLiPDStore((state) => state.dataset);
  const [page, setPage] = React__default.default.useState(0);
  const [rowsPerPage, setRowsPerPage] = React__default.default.useState(10);
  const [csvDialogOpen, setCsvDialogOpen] = React__default.default.useState(false);
  const [csvContent, setCsvContent] = React__default.default.useState("");
  const { selectedNode, setSelectedNode } = useLiPDStore((state) => ({
    selectedNode: state.selectedNode,
    setSelectedNode: state.setSelectedNode
  }));
  const table = getValueFromPath(dataset, path);
  const columns = table.getVariables() || [];
  const dataList = table.getDataList() || { data: [], metadata: [] };
  const rows = (dataList.data || []).length > 0 ? (dataList.data[0] || []).map(
    (_, colIndex) => (dataList.data || []).map((row) => row[colIndex] || "")
  ) : [];
  const metadata = dataList.metadata || [];
  const variables = table.getVariables() || [];
  const handleAddRow = () => {
    const newRow = Array(columns.length).fill("");
    const updatedRows = [...rows, newRow];
    table.setDataList({
      data: updatedRows,
      metadata
    });
    onUpdate(path, table);
  };
  const handleDeleteRow = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows.splice(rowIndex, 1);
    table.setDataList({
      data: updatedRows,
      metadata
    });
    onUpdate(path, table);
  };
  const handleAddVariable = () => {
    const newVariable = new lipdjs.Variable();
    const updatedVariables = [...variables, newVariable];
    table.setVariables(updatedVariables);
    onUpdate(path, table);
    const newIndex = variables.length;
    setSelectedNode(`${selectedNode}.variables.${newIndex}`);
  };
  const handleEditVariable = (index) => {
    setSelectedNode(`${selectedNode}.variables.${index}`);
  };
  const handleDeleteVariable = (index) => {
    const updatedVariables = [...variables];
    updatedVariables.splice(index, 1);
    table.setVariables(updatedVariables);
    onUpdate(path, table);
  };
  const handleImportCSV = (event) => {
    const file = event.target.files?.[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result;
      const lines = csvText.split("\n");
      const headers = lines[0].split(",").map((header) => header.trim());
      const existingVariables = table.getVariables() || [];
      const existingVariableNames = existingVariables.map((v) => v.getName());
      headers.forEach((header) => {
        if (!existingVariableNames.includes(header)) {
          const newVariable = new lipdjs.Variable();
          newVariable.setName(header);
          existingVariables.push(newVariable);
        }
      });
      table.setVariables(existingVariables);
      const newData = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim())
          continue;
        const values = lines[i].split(",").map((value) => value.trim());
        newData.push(values);
      }
      let metadata2 = table.getDataList().metadata;
      table.setDataList({ data: newData, metadata: metadata2 });
      onUpdate(path, table);
    };
    reader.readAsText(file);
  };
  const handleExportCSV = () => {
    const headers = columns.map((column) => column.getName());
    let csvContent2 = headers.join(",") + "\n";
    rows.forEach((rowData) => {
      csvContent2 += rowData.join(",") + "\n";
    });
    setCsvContent(csvContent2);
    setCsvDialogOpen(true);
  };
  const gridColumns = [
    ...columns.map((column, colIndex) => ({
      field: colIndex.toString(),
      headerName: column.getName(),
      flex: 1,
      minWidth: 150,
      editable: !readonly
    })),
    ...readonly ? [] : [{
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params2) => /* @__PURE__ */ React__default.default.createElement(material.Box, null, /* @__PURE__ */ React__default.default.createElement(
        material.IconButton,
        {
          size: "small",
          edge: "end",
          "aria-label": "delete",
          onClick: (e) => {
            e.stopPropagation();
            handleDeleteRow(params2.row.rowIndex);
          }
        },
        /* @__PURE__ */ React__default.default.createElement(DeleteIcon, { sx: { fontSize: 16 } })
      ))
    }]
  ];
  const gridRows = rows.map((rowData, rowIndex) => {
    const row = {
      id: rowIndex,
      rowIndex
      // Store the actual row index for operations
    };
    columns.forEach((column, colIndex) => {
      row[colIndex.toString()] = rowData[colIndex] || "";
    });
    return row;
  });
  return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { p: 0 } }, /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 } }, /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "h6" }, title), !readonly && /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { display: "flex", gap: 1 } }, /* @__PURE__ */ React__default.default.createElement(
    material.Button,
    {
      variant: "contained",
      startIcon: /* @__PURE__ */ React__default.default.createElement(FileUploadIcon, null),
      size: "small",
      component: "label"
    },
    "Import CSV",
    /* @__PURE__ */ React__default.default.createElement(
      "input",
      {
        type: "file",
        hidden: true,
        accept: ".csv",
        onChange: handleImportCSV
      }
    )
  ), /* @__PURE__ */ React__default.default.createElement(
    material.Button,
    {
      variant: "contained",
      startIcon: /* @__PURE__ */ React__default.default.createElement(FileDownloadIcon, null),
      size: "small",
      onClick: handleExportCSV
    },
    "Export CSV"
  ), /* @__PURE__ */ React__default.default.createElement(
    material.Button,
    {
      variant: "contained",
      startIcon: /* @__PURE__ */ React__default.default.createElement(AddIcon, { sx: { fontSize: 18 } }),
      size: "small",
      onClick: handleAddRow
    },
    "Add Row"
  ))), /* @__PURE__ */ React__default.default.createElement(material.Grid, { container: true, spacing: 2, sx: { mb: 2 } }, /* @__PURE__ */ React__default.default.createElement(material.Grid, { item: true, xs: 12, sm: 6 }, /* @__PURE__ */ React__default.default.createElement(
    FormTextField,
    {
      key: `${path}.fileName`,
      label: "File Name",
      defaultValue: table.getFileName() || "",
      onBlur: (value) => {
        table.setFileName(value);
        onUpdate(path, table);
      },
      disabled: readonly
    }
  )), /* @__PURE__ */ React__default.default.createElement(material.Grid, { item: true, xs: 12, sm: 6 }, /* @__PURE__ */ React__default.default.createElement(
    FormTextField,
    {
      key: `${path}.missingValue`,
      label: "Missing Value",
      defaultValue: table.getMissingValue() || "",
      onBlur: (value) => {
        table.setMissingValue(value);
        onUpdate(path, table);
      },
      disabled: readonly
    }
  ))), /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { height: 500, width: "100%", mb: 2 } }, /* @__PURE__ */ React__default.default.createElement(
    xDataGrid.DataGrid,
    {
      rows: gridRows,
      columns: gridColumns,
      initialState: {
        pagination: {
          paginationModel: {
            pageSize: rowsPerPage,
            page
          }
        }
      },
      pageSizeOptions: [5, 10, 25, 50],
      onPaginationModelChange: (params2) => {
        setPage(params2.page);
        setRowsPerPage(params2.pageSize);
      },
      disableRowSelectionOnClick: true
    }
  )), /* @__PURE__ */ React__default.default.createElement(
    ListView_default,
    {
      title: "Variables",
      schema: variableSchema,
      items: variables,
      onAdd: readonly ? void 0 : handleAddVariable,
      onEdit: handleEditVariable,
      onDelete: readonly ? void 0 : handleDeleteVariable,
      addButtonText: "Add Variable",
      pathPrefix: `${selectedNode}.variables`,
      readonly
    }
  ), /* @__PURE__ */ React__default.default.createElement(
    Dialog__default.default,
    {
      open: csvDialogOpen,
      onClose: () => setCsvDialogOpen(false),
      maxWidth: "md",
      fullWidth: true
    },
    /* @__PURE__ */ React__default.default.createElement(DialogTitle__default.default, null, "CSV Data for ", table.getFileName() || "data", ".csv"),
    /* @__PURE__ */ React__default.default.createElement(DialogContent__default.default, null, /* @__PURE__ */ React__default.default.createElement(
      material.TextField,
      {
        multiline: true,
        fullWidth: true,
        value: csvContent,
        variant: "standard",
        InputProps: {
          readOnly: true,
          style: {
            fontFamily: "monospace",
            whiteSpace: "pre",
            overflowX: "auto"
          }
        },
        margin: "dense"
      }
    )),
    /* @__PURE__ */ React__default.default.createElement(DialogActions__default.default, null, /* @__PURE__ */ React__default.default.createElement(material.Button, { onClick: () => setCsvDialogOpen(false) }, "Close"))
  ));
};
var DefaultListEditor = ({
  dataset,
  path,
  title = "",
  params = {},
  onUpdate,
  schema,
  columns = 1,
  dense = true,
  fieldSchema = {},
  readonly = false
}) => {
  const setSelectedNode = useLiPDStore((state) => state.setSelectedNode);
  const list = getValueFromPath(dataset, path);
  if (!dataset)
    return null;
  if (readonly && (!list || list.length === 0)) {
    return null;
  }
  const handleEditItem = (index) => {
    const itemPath = `${path}.${index}`;
    onUpdate(itemPath, list[index]);
    setSelectedNode(itemPath);
  };
  const handleAddItem = () => {
    const newItem = createDefaultItem(schema, void 0);
    const newList = [...list, newItem];
    onUpdate(path, newList);
    const newIndex = newList.length - 1;
    const newItemPath = `${path}.${newIndex}`;
    setSelectedNode(newItemPath);
  };
  const handleDeleteItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    onUpdate(path, newList);
  };
  return /* @__PURE__ */ React__default.default.createElement(
    ListView_default,
    {
      schema,
      title: title || fieldSchema.label || "Items",
      items: list,
      onAdd: readonly ? void 0 : () => handleAddItem(),
      onEdit: (index) => handleEditItem(index),
      onDelete: readonly ? void 0 : (index) => handleDeleteItem(index),
      addButtonText: "Add",
      pathPrefix: path,
      dense,
      fieldSchema,
      readonly
    }
  );
};
var MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || "pk.eyJ1IjoidmFydW5yYXRuYWthciIsImEiOiJjamZ3MnZjNjEwNnBzMnhvOHBpdHB5NGtpIn0.Qm9PUDyLZe6rpB3P0YBUWw";
var LocationEditor = ({ dataset, path, params, onUpdate, title = "", readonly = false }) => {
  const location = getValueFromPath(dataset, path);
  const [coordinates, setCoordinates] = React.useState({
    lat: parseFloat(location.latitude || "0") || 0,
    lng: parseFloat(location.longitude || "0") || 0
  });
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);
  const marker = React.useRef(null);
  React.useEffect(() => {
    if (!mapContainer.current || map.current)
      return;
    mapboxgl__default.default.accessToken = MAPBOX_TOKEN;
    const initialLat = parseFloat(location.latitude || "0") || 0;
    const initialLng = parseFloat(location.longitude || "0") || 0;
    map.current = new mapboxgl__default.default.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      // Satellite view with terrain
      center: [initialLng, initialLat],
      zoom: 8
    });
    map.current.on("load", () => {
      map.current?.addSource("mapbox-dem", {
        "type": "raster-dem",
        "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
        "tileSize": 512,
        "maxzoom": 14
      });
      map.current?.addLayer({
        "id": "sky",
        "type": "sky",
        "paint": {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0, 90],
          "sky-atmosphere-sun-intensity": 15
        }
      });
    });
    marker.current = new mapboxgl__default.default.Marker({
      draggable: !readonly,
      color: "#FF0000"
    }).setLngLat([initialLng, initialLat]).addTo(map.current);
    if (!readonly) {
      marker.current.on("dragend", () => {
        const position = marker.current?.getLngLat();
        if (position) {
          location.latitude = position.lat.toFixed(6);
          location.longitude = position.lng.toFixed(6);
          setCoordinates({
            lat: position.lat,
            lng: position.lng
          });
          onUpdate(path, location);
        }
      });
    }
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);
  React.useEffect(() => {
    const currentLat = parseFloat(location.latitude || "0") || 0;
    const currentLng = parseFloat(location.longitude || "0") || 0;
    if (currentLat !== coordinates.lat || currentLng !== coordinates.lng) {
      setCoordinates({
        lat: currentLat,
        lng: currentLng
      });
      if (marker.current && map.current) {
        marker.current.setLngLat([currentLng, currentLat]);
        map.current.flyTo({
          center: [currentLng, currentLat],
          zoom: 8,
          duration: 1e3
        });
      }
    }
  }, [location.latitude, location.longitude]);
  return /* @__PURE__ */ React__default.default.createElement(
    material.Box,
    {
      ref: mapContainer,
      sx: {
        mt: 1,
        height: 400,
        borderRadius: 1,
        overflow: "hidden"
      }
    }
  );
};
var LocationEditor_default = LocationEditor;
var DefaultEnumEditor = ({
  path,
  params,
  onUpdate,
  schema,
  fieldSchema,
  title = "",
  readonly = false
}) => {
  const dataset = useLiPDStore((state) => state.dataset);
  const value = getValueFromPath(dataset, path);
  const enumValue = value;
  if (!fieldSchema) {
    return null;
  }
  let displayValue = "";
  let idValue = "";
  if (enumValue) {
    displayValue = enumValue.label;
    idValue = enumValue.id;
  }
  if (readonly) {
    if (!displayValue)
      return null;
    return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { py: 0.5 } }, /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "caption", color: "text.secondary", sx: { mr: 1 } }, fieldSchema.label, ":"), /* @__PURE__ */ React__default.default.createElement(material.Typography, { component: "span" }, displayValue));
  }
  return /* @__PURE__ */ React__default.default.createElement(FormControl__default.default, { variant: formVariant, sx: { mt: 2, width: "100%" } }, /* @__PURE__ */ React__default.default.createElement(InputLabel__default.default, null, fieldSchema.label), /* @__PURE__ */ React__default.default.createElement(
    Select__default.default,
    {
      label: fieldSchema.label,
      value: idValue,
      size: "small",
      margin: "dense",
      variant: formVariant,
      onChange: (event) => {
        let newValue = event.target.value;
        const enumOption = fieldSchema.schema?.enum?.[newValue];
        if (enumOption) {
          const cls = fieldSchema.schema?.class;
          if (cls) {
            newValue = new cls(enumOption.id, enumOption.label);
            onUpdate(path, newValue);
          }
        }
      }
    },
    Object.values(fieldSchema.schema?.enum || {}).map((option) => /* @__PURE__ */ React__default.default.createElement(material.MenuItem, { key: option.id, value: option.id }, option.label))
  ));
};

// src/components/DefaultEditor.tsx
var DefaultEditor = ({
  dataset,
  path,
  params,
  onUpdate,
  schema,
  columns = 1,
  dense = true,
  title = "",
  fieldSchema = { type: "object" },
  useFieldset = false,
  readonly = false
}) => {
  const renderField = () => {
    const parts = path.split(".");
    const fieldName = parts[parts.length - 1];
    if (fieldName.startsWith("_"))
      return null;
    const value = getValueFromPath(dataset, path);
    if (fieldSchema.type === "enum") {
      return /* @__PURE__ */ React__default.default.createElement(
        DefaultEnumEditor,
        {
          dataset,
          path,
          params,
          onUpdate,
          schema,
          fieldSchema,
          readonly
        }
      );
    }
    if (fieldSchema.type === "string" || fieldSchema.type === "number") {
      return /* @__PURE__ */ React__default.default.createElement(
        FormTextField,
        {
          key: path,
          label: fieldSchema.label || fieldName,
          defaultValue: value || "",
          type: fieldSchema.type,
          multiline: fieldSchema.multiline,
          rows: fieldSchema.rows,
          onBlur: (newValue) => onUpdate(path, newValue),
          disabled: readonly
        }
      );
    }
    if (fieldSchema.type === "object") {
      const content = /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, null, /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { p: dense ? 0 : 1 } }, fieldName === "location" && /* @__PURE__ */ React__default.default.createElement(
        LocationEditor_default,
        {
          dataset,
          path,
          params,
          onUpdate,
          title,
          readonly
        }
      ), Object.entries(schema?.fields || {}).map(([fieldName2, subSchema]) => {
        if (subSchema.hidden)
          return null;
        return /* @__PURE__ */ React__default.default.createElement(
          DefaultEditor,
          {
            key: `${path}.${fieldName2}`,
            dataset,
            path: `${path}.${fieldName2}`,
            params,
            onUpdate,
            schema: subSchema.schema,
            columns,
            dense: false,
            fieldSchema: subSchema,
            useFieldset: true,
            readonly
          }
        );
      })));
      return useFieldset ? /* @__PURE__ */ React__default.default.createElement(Fieldset, { dense }, /* @__PURE__ */ React__default.default.createElement("legend", null, title || fieldSchema.label || fieldName), content) : content;
    }
    if (fieldSchema.type === "array" && fieldSchema.items) {
      return /* @__PURE__ */ React__default.default.createElement(
        DefaultListEditor,
        {
          dataset,
          fieldSchema,
          schema: fieldSchema.items.schema,
          title: fieldSchema.label || fieldName,
          onUpdate,
          path,
          dense: true,
          readonly
        }
      );
    }
    return null;
  };
  return renderField();
};
var RouterContext = React__default.default.createContext(null);
var routes = [
  {
    path: "dataset",
    component: DefaultEditor,
    label: "Dataset",
    title: "Dataset",
    itemLabel: (dataset) => dataset.name || "Dataset",
    schema: datasetSchema
  },
  // PaleoData or ChronData
  {
    path: "dataset/:dataType",
    component: DefaultListEditor,
    label: (params) => `${(params.dataType || " ").charAt(0).toUpperCase() + params.dataType?.slice(1)}`,
    title: (params) => `${(params.dataType || " ").charAt(0).toUpperCase() + params.dataType?.slice(1)}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)$/);
      return match ? { dataType: match[1] } : null;
    },
    schema: dataSchema
  },
  // PaleoData or ChronData
  {
    path: "dataset/:dataType/:index",
    component: DefaultEditor,
    title: (params) => `${(params.dataType || " ").charAt(0).toUpperCase() + params.dataType?.slice(1)} ${Number(params.index) + 1}`,
    label: (params) => `${(params.dataType || " ").charAt(0).toUpperCase() + params.dataType?.slice(1)} ${Number(params.index) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2])
      } : null;
    },
    schema: dataSchema
  },
  // Publications List
  {
    path: "dataset/publications",
    component: DefaultListEditor,
    label: "Publications",
    title: "Publications",
    schema: publicationSchema,
    getParams: (path) => {
      const match = path.match(/^dataset\.publications$/);
      return match ? {} : null;
    }
  },
  // Publication
  {
    path: "dataset/publications/:index",
    component: DefaultEditor,
    title: "Publication",
    label: (params) => `Publication ${Number(params.publicationIndex) + 1}`,
    itemLabel: (publication) => getPublicationTitleLabel(publication),
    getParams: (path) => {
      const match = path.match(/^dataset\.publications\.(\d+)$/);
      return match ? {
        publicationIndex: parseInt(match[1])
      } : null;
    },
    schema: publicationSchema
  },
  // Location
  {
    path: "dataset/location",
    component: DefaultEditor,
    label: "Location",
    title: "Location",
    itemLabel: () => "Location",
    getParams: (path) => {
      const match = path.match(/^dataset\.location$/);
      return match ? {} : null;
    },
    schema: locationSchema
  },
  // ChangeLog List
  {
    path: "dataset/changeLogs",
    component: DefaultListEditor,
    label: "ChangeLogs",
    title: "ChangeLogs",
    schema: changeLogSchema,
    getParams: (path) => {
      const match = path.match(/^dataset\.changeLogs$/);
      return match ? {} : null;
    }
  },
  // ChangeLog
  {
    path: "dataset/changeLogs/:index",
    component: DefaultEditor,
    title: "ChangeLog",
    label: (params) => `ChangeLog ${Number(params.changeLogIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.changeLogs\.(\d+)$/);
      return match ? {
        changeLogIndex: parseInt(match[1])
      } : null;
    },
    schema: changeLogSchema
  },
  // ChangeLogEntry
  {
    path: "dataset/changeLogs/:index/changes/:changeLogEntryIndex",
    component: DefaultEditor,
    title: "ChangeLogEntry",
    label: (params) => `ChangeLogEntry ${Number(params.changeLogEntryIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.changeLogs\.(\d+)\.changes\.(\d+)$/);
      return match ? {
        changeLogIndex: parseInt(match[1]),
        changeLogEntryIndex: parseInt(match[2])
      } : null;
    },
    schema: changeLogEntrySchema
  },
  // Fundings List
  {
    path: "dataset/fundings",
    component: DefaultListEditor,
    label: "Fundings",
    title: "Fundings",
    schema: fundingSchema,
    getParams: (path) => {
      const match = path.match(/^dataset\.fundings$/);
      return match ? {} : null;
    }
  },
  // Funding
  {
    path: "dataset/fundings/:index",
    component: DefaultEditor,
    title: "Funding",
    label: (params) => `Funding ${Number(params.fundingIndex) + 1}`,
    itemLabel: (funding) => getFundingLabel(funding),
    getParams: (path) => {
      const match = path.match(/^dataset\.fundings\.(\d+)$/);
      return match ? {
        fundingIndex: parseInt(match[1])
      } : null;
    },
    schema: fundingSchema
  },
  // PaleoData or ChronData measurement Tables
  {
    path: "dataset/:dataType/:index/measurementTables/:tableIndex",
    component: DataTableEditor,
    title: "Data Table",
    label: (params) => `Measurement Table ${Number(params.tableIndex) + 1}`,
    itemLabel: (table) => getDataTableLabel(table),
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.measurementTables\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        tableIndex: parseInt(match[3])
      } : null;
    },
    schema: dataTableSchema
  },
  // PaleoData or ChronData measurement Tables variables
  {
    path: "dataset/:dataType/:index/measurementTables/:tableIndex/variables/:varIndex",
    component: DefaultEditor,
    title: "Variable",
    label: (params) => `Variable ${Number(params.varIndex) + 1}`,
    itemLabel: (variable) => getVariableNameLabel(variable),
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.measurementTables\.(\d+)\.variables\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        tableIndex: parseInt(match[3]),
        varIndex: parseInt(match[4])
      } : null;
    },
    schema: variableSchema
  },
  // PaleoData or ChronData measurement Tables variables interpretations
  {
    path: "dataset/:dataType/:index/measurementTables/:tableIndex/variables/:varIndex/interpretations/:interpretationIndex",
    component: DefaultEditor,
    title: "Interpretation",
    label: (params) => `Interpretation ${Number(params.interpretationIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.measurementTables\.(\d+)\.variables\.(\d+)\.interpretations\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        tableIndex: parseInt(match[3]),
        varIndex: parseInt(match[4]),
        interpretationIndex: parseInt(match[5])
      } : null;
    },
    schema: interpretationSchema
  },
  // PaleoData or ChronData measurement Tables variables partOfCompilations
  {
    path: "dataset/:dataType/:index/measurementTables/:tableIndex/variables/:varIndex/partOfCompilations/:compilationIndex",
    component: DefaultEditor,
    title: "Compilation",
    label: (params) => `Compilation ${Number(params.compilationIndex) + 1}`,
    itemLabel: (compilation) => getCompilationNameLabel(compilation),
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.measurementTables\.(\d+)\.variables\.(\d+)\.partOfCompilations\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        tableIndex: parseInt(match[3]),
        varIndex: parseInt(match[4]),
        compilationIndex: parseInt(match[5])
      } : null;
    },
    schema: compilationSchema
  },
  // PaleoData or ChronData measurement Tables variables calibrations
  {
    path: "dataset/:dataType/:index/measurementTables/:tableIndex/variables/:varIndex/calibrations/:calibrationIndex",
    component: DefaultEditor,
    title: "Calibration",
    label: (params) => `Calibration ${Number(params.calibrationIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.measurementTables\.(\d+)\.variables\.(\d+)\.calibratedVias\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        tableIndex: parseInt(match[3]),
        varIndex: parseInt(match[4]),
        calibrationIndex: parseInt(match[5])
      } : null;
    },
    schema: calibrationSchema
  },
  // PaleoData or ChronData models
  {
    path: "dataset/:dataType/:index/modeledBy/:modelIndex",
    component: DefaultEditor,
    title: "Model",
    label: (params) => `Model ${Number(params.modelIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.modeledBy\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        modelIndex: parseInt(match[3])
      } : null;
    },
    schema: modelSchema
  },
  // PaleoData or ChronData modeledBy Tables
  {
    path: "dataset/:dataType/:index/modeledBy/:modelIndex/:tableType/:tableIndex",
    component: DataTableEditor,
    title: "Data Table",
    label: (params) => `Summary Table ${Number(params.tableIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.modeledBy\.(\d+)\.(summaryTables|ensembleTables|distributionTables)\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        modelIndex: parseInt(match[3]),
        tableType: match[4],
        tableIndex: parseInt(match[5])
      } : null;
    },
    schema: dataTableSchema
  },
  // ChronData or PaleoData modeledBy Tables variables
  {
    path: "dataset/:dataType/:index/modeledBy/:modelIndex/:tableType/:tableIndex/variables/:varIndex",
    component: DefaultEditor,
    title: "Variable",
    label: (params) => `Variable ${Number(params.varIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.modeledBy\.(\d+)\.(summaryTables|ensembleTables|distributionTables)\.(\d+)\.variables\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        modelIndex: parseInt(match[3]),
        tableType: match[4],
        tableIndex: parseInt(match[5]),
        varIndex: parseInt(match[6])
      } : null;
    },
    schema: variableSchema
  },
  // PaleoData or ChronData modeledBy Tables variables interpretations
  {
    path: "dataset/:dataType/:index/modeledBy/:modelIndex/:tableType/:tableIndex/variables/:varIndex/interpretations/:interpretationIndex",
    component: DefaultEditor,
    title: "Interpretation",
    label: (params) => `Interpretation ${Number(params.interpretationIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.modeledBy\.(\d+)\.(summaryTables|ensembleTables|distributionTables)\.(\d+)\.variables\.(\d+)\.interpretations\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        modelIndex: parseInt(match[3]),
        tableType: match[4],
        tableIndex: parseInt(match[5]),
        varIndex: parseInt(match[6]),
        interpretationIndex: parseInt(match[7])
      } : null;
    },
    schema: interpretationSchema
  },
  // PaleoData or ChronData modeledBy Tables variables partOfCompilations
  {
    path: "dataset/:dataType/:index/modeledBy/:modelIndex/:tableType/:tableIndex/variables/:varIndex/partOfCompilations/:compilationIndex",
    component: DefaultEditor,
    title: "Compilation",
    label: (params) => `Compilation ${Number(params.compilationIndex) + 1}`,
    itemLabel: (compilation) => getCompilationNameLabel(compilation),
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.modeledBy\.(\d+)\.(summaryTables|ensembleTables|distributionTables)\.(\d+)\.variables\.(\d+)\.partOfCompilations\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        modelIndex: parseInt(match[3]),
        tableType: match[4],
        tableIndex: parseInt(match[5]),
        varIndex: parseInt(match[6]),
        compilationIndex: parseInt(match[7])
      } : null;
    },
    schema: compilationSchema
  },
  // PaleoData or ChronData modeledBy Tables variables calibrations
  {
    path: "dataset/:dataType/:index/modeledBy/:modelIndex/:tableType/:tableIndex/variables/:varIndex/calibrations/:calibrationIndex",
    component: DefaultEditor,
    title: "Calibration",
    label: (params) => `Calibration ${Number(params.calibrationIndex) + 1}`,
    getParams: (path) => {
      const match = path.match(/^dataset\.(paleoData|chronData)\.(\d+)\.modeledBy\.(\d+)\.(summaryTables|ensembleTables|distributionTables)\.(\d+)\.variables\.(\d+)\.calibratedVias\.(\d+)$/);
      return match ? {
        dataType: match[1],
        index: parseInt(match[2]),
        modelIndex: parseInt(match[3]),
        tableType: match[4],
        tableIndex: parseInt(match[5]),
        varIndex: parseInt(match[6]),
        calibrationIndex: parseInt(match[7])
      } : null;
    },
    schema: calibrationSchema
  },
  // ===== PERSON ROUTES =====
  // Dataset Investigators List
  {
    path: "dataset/investigators",
    component: DefaultListEditor,
    label: "Investigators",
    title: "Investigators",
    schema: personSchema,
    getParams: (path) => {
      const match = path.match(/^dataset\.investigators$/);
      return match ? {} : null;
    }
  },
  // Dataset Investigator
  {
    path: "dataset/investigators/:index",
    component: DefaultEditor,
    title: "Investigator",
    label: (params) => `Investigator ${Number(params.personIndex) + 1}`,
    itemLabel: (person) => getPersonNameLabel(person),
    getParams: (path) => {
      const match = path.match(/^dataset\.investigators\.(\d+)$/);
      return match ? {
        personIndex: parseInt(match[1])
      } : null;
    },
    schema: personSchema
  },
  // Dataset Creators List
  {
    path: "dataset/creators",
    component: DefaultListEditor,
    label: "Creators",
    title: "Creators",
    schema: personSchema,
    getParams: (path) => {
      const match = path.match(/^dataset\.creators$/);
      return match ? {} : null;
    }
  },
  // Dataset Creator
  {
    path: "dataset/creators/:index",
    component: DefaultEditor,
    title: "Creator",
    label: (params) => `Creator ${Number(params.personIndex) + 1}`,
    itemLabel: (person) => getPersonNameLabel(person),
    getParams: (path) => {
      const match = path.match(/^dataset\.creators\.(\d+)$/);
      return match ? {
        personIndex: parseInt(match[1])
      } : null;
    },
    schema: personSchema
  },
  // Dataset Contributors List
  {
    path: "dataset/contributors",
    component: DefaultListEditor,
    label: "Contributors",
    title: "Contributors",
    schema: personSchema,
    getParams: (path) => {
      const match = path.match(/^dataset\.contributors$/);
      return match ? {} : null;
    }
  },
  // Dataset Contributor
  {
    path: "dataset/contributors/:index",
    component: DefaultEditor,
    title: "Contributor",
    label: (params) => `Contributor ${Number(params.personIndex) + 1}`,
    itemLabel: (person) => getPersonNameLabel(person),
    getParams: (path) => {
      const match = path.match(/^dataset\.contributors\.(\d+)$/);
      return match ? {
        personIndex: parseInt(match[1])
      } : null;
    },
    schema: personSchema
  },
  // Publication Authors List
  {
    path: "dataset/publications/:publicationIndex/authors",
    component: DefaultListEditor,
    label: "Authors",
    title: "Authors",
    schema: personSchema,
    getParams: (path) => {
      const match = path.match(/^dataset\.publications\.(\d+)\.authors$/);
      return match ? {
        publicationIndex: parseInt(match[1])
      } : null;
    }
  },
  // Publication Author
  {
    path: "dataset/publications/:publicationIndex/authors/:authorIndex",
    component: DefaultEditor,
    title: "Author",
    label: (params) => `Author ${Number(params.authorIndex) + 1}`,
    itemLabel: (person) => getPersonNameLabel(person),
    getParams: (path) => {
      const match = path.match(/^dataset\.publications\.(\d+)\.authors\.(\d+)$/);
      return match ? {
        publicationIndex: parseInt(match[1]),
        authorIndex: parseInt(match[2])
      } : null;
    },
    schema: personSchema
  },
  // Publication First Author
  {
    path: "dataset/publications/:publicationIndex/firstAuthor",
    component: DefaultEditor,
    title: "First Author",
    label: "First Author",
    itemLabel: (person) => getPersonNameLabel(person),
    getParams: (path) => {
      const match = path.match(/^dataset\.publications\.(\d+)\.firstAuthor$/);
      return match ? {
        publicationIndex: parseInt(match[1])
      } : null;
    },
    schema: personSchema
  },
  // Funding Investigators List
  {
    path: "dataset/fundings/:fundingIndex/investigators",
    component: DefaultListEditor,
    label: "Investigators",
    title: "Investigators",
    schema: personSchema,
    getParams: (path) => {
      const match = path.match(/^dataset\.fundings\.(\d+)\.investigators$/);
      return match ? {
        fundingIndex: parseInt(match[1])
      } : null;
    }
  },
  // Funding Investigator
  {
    path: "dataset/fundings/:fundingIndex/investigators/:investigatorIndex",
    component: DefaultEditor,
    title: "Investigator",
    label: (params) => `Investigator ${Number(params.investigatorIndex) + 1}`,
    itemLabel: (person) => getPersonNameLabel(person),
    getParams: (path) => {
      const match = path.match(/^dataset\.fundings\.(\d+)\.investigators\.(\d+)$/);
      return match ? {
        fundingIndex: parseInt(match[1]),
        investigatorIndex: parseInt(match[2])
      } : null;
    },
    schema: personSchema
  }
];
var findMatchingRoute = (path) => {
  for (const route of routes) {
    if (route.getParams) {
      const params = route.getParams(path);
      if (params) {
        return { route, params, schema: route.schema || {} };
      }
    } else if (route.path === path) {
      return { route, params: {}, schema: route.schema || {} };
    }
  }
  return null;
};
var generateBreadcrumbs = (path) => {
  const parts = path.split(".");
  const breadcrumbs = [];
  let currentPath = "";
  for (let i = 0; i < parts.length; i++) {
    currentPath = currentPath ? `${currentPath}.${parts[i]}` : parts[i];
    const match = findMatchingRoute(currentPath);
    if (match) {
      const { route, params } = match;
      let label;
      if (route.itemLabel) {
        const dataset = useLiPDStore.getState().dataset;
        const item = getItemFromPath(dataset, currentPath);
        if (item) {
          label = route.itemLabel(item);
        }
      }
      if (!label) {
        label = typeof route.label === "function" ? route.label(params) : route.label;
      }
      breadcrumbs.push({ label, path: currentPath });
    }
  }
  return breadcrumbs;
};
var getItemFromPath = (dataset, path) => {
  if (!dataset || !path)
    return null;
  if (path === "dataset")
    return dataset;
  const normalizedPath = path.startsWith("dataset.") ? path.substring(8) : path;
  const parts = normalizedPath.split(".");
  let current = dataset;
  for (const part of parts) {
    if (!current || current[part] === void 0) {
      return null;
    }
    current = current[part];
  }
  return current;
};
var RouterProvider = ({ children }) => {
  const { selectedNode, setSelectedNode, dataset } = useLiPDStore((state) => ({
    selectedNode: state.selectedNode,
    setSelectedNode: state.setSelectedNode,
    dataset: state.dataset
  }));
  const [navigationHistory, setNavigationHistory] = React__default.default.useState([]);
  const [historyIndex, setHistoryIndex] = React__default.default.useState(-1);
  const currentPath = selectedNode || "dataset";
  React__default.default.useEffect(() => {
    if (currentPath) {
      if (historyIndex < navigationHistory.length - 1) {
        setNavigationHistory((prev) => prev.slice(0, historyIndex + 1));
      }
      if (historyIndex === -1 || currentPath !== navigationHistory[historyIndex]) {
        setNavigationHistory((prev) => [...prev, currentPath]);
        setHistoryIndex((prev) => prev + 1);
      }
    }
  }, [currentPath, historyIndex, navigationHistory]);
  const navigateTo = React.useCallback((path) => {
    setSelectedNode(path);
  }, [setSelectedNode]);
  const goBack = React.useCallback(() => {
    if (historyIndex > 0) {
      const previousPath = navigationHistory[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setSelectedNode(previousPath);
    }
  }, [historyIndex, navigationHistory, setSelectedNode]);
  const canGoBack = historyIndex > 0;
  const breadcrumbs = React.useMemo(() => generateBreadcrumbs(currentPath), [currentPath, dataset]);
  return /* @__PURE__ */ React__default.default.createElement(RouterContext.Provider, { value: { currentPath, navigateTo, goBack, breadcrumbs, canGoBack } }, children);
};
var useRouter = () => {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};
var Router = () => {
  const { currentPath } = useRouter();
  const { updateDataset, isLoading, dataset, loadingMessage, datasetName, readonly } = useLiPDStore((state) => ({
    updateDataset: state.updateDataset,
    isLoading: state.isLoading,
    dataset: state.dataset,
    loadingMessage: state.loadingMessage,
    datasetName: state.datasetName,
    readonly: state.readonly
  }));
  if (isLoading) {
    return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      p: 3
    } }, /* @__PURE__ */ React__default.default.createElement(material.CircularProgress, { size: 40 }), /* @__PURE__ */ React__default.default.createElement(material.Typography, { sx: { mt: 2, mb: 1 }, variant: "h6" }, datasetName ? `Loading ${datasetName}...` : "Loading dataset..."), loadingMessage && /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "body2", color: "text.secondary" }, loadingMessage));
  }
  if (!dataset) {
    return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      p: 3
    } }, /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "h6" }, "No dataset available"), /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "body2", color: "text.secondary" }, "Please select a dataset to view"));
  }
  const match = findMatchingRoute(currentPath);
  if (!match) {
    return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      p: 3,
      textAlign: "center"
    } }, /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "h6", sx: { mb: 2 } }, "Path not found: ", currentPath), /* @__PURE__ */ React__default.default.createElement(material.Typography, null, "Please select an item from the navigation panel or try reloading the editor."));
  }
  const { route, params, schema } = match;
  const Component = route.component;
  const title = typeof route.title === "function" ? route.title(params) : route.title;
  return /* @__PURE__ */ React__default.default.createElement(
    Component,
    {
      dataset,
      params,
      path: currentPath,
      onUpdate: updateDataset,
      schema,
      title,
      readonly
    }
  );
};

// src/components/AppBarBreadcrumbs.tsx
var AppBarBreadcrumbs = () => {
  const { breadcrumbs, navigateTo, goBack, canGoBack } = useRouter();
  return /* @__PURE__ */ React__default.default.createElement(Box__default.default, { sx: { display: "flex", alignItems: "center", flexGrow: 1 } }, /* @__PURE__ */ React__default.default.createElement(Tooltip__default.default, { title: "Go back" }, /* @__PURE__ */ React__default.default.createElement("span", null, /* @__PURE__ */ React__default.default.createElement(
    IconButton__default.default,
    {
      size: "small",
      onClick: goBack,
      disabled: !canGoBack,
      sx: { mr: 1 },
      "aria-label": "Back"
    },
    /* @__PURE__ */ React__default.default.createElement(ArrowBackIcon, { fontSize: "small" })
  ))), /* @__PURE__ */ React__default.default.createElement(
    Breadcrumbs__default.default,
    {
      separator: /* @__PURE__ */ React__default.default.createElement(NavigateNextIcon, { fontSize: "small" }),
      "aria-label": "breadcrumb",
      sx: { flexGrow: 1 }
    },
    breadcrumbs.map((crumb, index) => /* @__PURE__ */ React__default.default.createElement(
      Typography6__default.default,
      {
        key: crumb.path,
        variant: "body1",
        color: index === breadcrumbs.length - 1 ? "text.primary" : "primary",
        onClick: () => navigateTo(crumb.path),
        sx: {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontWeight: index === breadcrumbs.length - 1 ? "bold" : "normal"
        }
      },
      index === 0 && /* @__PURE__ */ React__default.default.createElement(HomeIcon, { sx: { mr: 0.5 }, fontSize: "small" }),
      crumb.label
    ))
  ));
};
var AppBarBreadcrumbs_default = AppBarBreadcrumbs;
var TreeItem = ({
  node,
  label,
  nodeId,
  hasChildren,
  level = 0
}) => {
  const { expandedNodes, selectedNode, setSelectedNode, toggleExpandNode } = useLiPDStore((state) => ({
    expandedNodes: state.expandedNodes,
    selectedNode: state.selectedNode,
    setSelectedNode: state.setSelectedNode,
    toggleExpandNode: state.toggleExpandNode
  }));
  const isExpanded = expandedNodes.has(nodeId);
  const isSelected = selectedNode === nodeId;
  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedNode(nodeId);
  };
  const handleToggle = (e) => {
    e.stopPropagation();
    toggleExpandNode(nodeId);
  };
  const getIcon = () => {
    const parts = nodeId.split(".");
    if (parts[0] === "dataset") {
      return /* @__PURE__ */ React__default.default.createElement(DescriptionIcon, null);
    }
    if (parts[0] === "paleoData") {
      if (parts.length >= 3 && parts[2] === "measurementTables") {
        return /* @__PURE__ */ React__default.default.createElement(TableChartIcon, null);
      }
      return /* @__PURE__ */ React__default.default.createElement(FolderIcon, null);
    }
    if (parts[0] === "publications") {
      return /* @__PURE__ */ React__default.default.createElement(ArticleIcon, null);
    }
    if (parts[0] === "chronData") {
      return /* @__PURE__ */ React__default.default.createElement(TableRowsIcon, null);
    }
    return /* @__PURE__ */ React__default.default.createElement(DescriptionIcon, null);
  };
  const safeLabel = typeof label === "object" && label !== null ? JSON.stringify(label) : String(label || "");
  return /* @__PURE__ */ React__default.default.createElement(
    material.ListItem,
    {
      button: true,
      onClick: handleClick,
      selected: isSelected,
      sx: {
        pl: level * 2 + 1,
        borderLeft: isSelected ? "2px solid" : "none",
        borderColor: "primary.main",
        bgcolor: isSelected ? "action.selected" : "inherit"
      }
    },
    hasChildren && /* @__PURE__ */ React__default.default.createElement(material.ListItemIcon, { onClick: handleToggle, sx: { minWidth: 24 } }, isExpanded ? /* @__PURE__ */ React__default.default.createElement(ExpandMoreIcon, null) : /* @__PURE__ */ React__default.default.createElement(ChevronRightIcon, null)),
    !hasChildren && /* @__PURE__ */ React__default.default.createElement(material.ListItemIcon, { sx: { minWidth: 24 } }, getIcon()),
    /* @__PURE__ */ React__default.default.createElement(material.ListItemText, { primary: safeLabel })
  );
};
var TreeItem_default = TreeItem;

// src/components/ChronDataTree.tsx
var ChronDataTree = ({ dataset }) => {
  const { expandedNodes } = useLiPDStore((state) => ({
    expandedNodes: state.expandedNodes
  }));
  return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, null, /* @__PURE__ */ React__default.default.createElement(
    TreeItem_default,
    {
      node: dataset,
      label: "ChronData",
      nodeId: "chronData",
      hasChildren: true
    }
  ), expandedNodes.has("chronData") && dataset.getChronData()?.map((chronData, chronIndex) => {
    const chronNodeId = `chronData.${chronIndex}`;
    const hasChildren = chronData.getMeasurementTables() && chronData.getMeasurementTables().length > 0;
    return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, { key: chronNodeId }, /* @__PURE__ */ React__default.default.createElement(
      TreeItem_default,
      {
        node: chronData,
        label: `ChronData ${chronIndex + 1}`,
        nodeId: chronNodeId,
        hasChildren,
        level: 1
      }
    ), expandedNodes.has(chronNodeId) && hasChildren && chronData.getMeasurementTables()?.map((table, tableIndex) => {
      const tableNodeId = `chronData.${chronIndex}.measurementTables.${tableIndex}`;
      return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, { key: tableNodeId }, /* @__PURE__ */ React__default.default.createElement(
        TreeItem_default,
        {
          node: table,
          label: table.getFileName() || `Table ${tableIndex + 1}`,
          nodeId: tableNodeId,
          hasChildren: false,
          level: 2
        }
      ));
    }));
  }));
};
var ChronDataTree_default = ChronDataTree;
var ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  return /* @__PURE__ */ React__default.default.createElement(
    Dialog__default.default,
    {
      open,
      onClose: onCancel,
      "aria-labelledby": "confirm-dialog-title",
      "aria-describedby": "confirm-dialog-description"
    },
    /* @__PURE__ */ React__default.default.createElement(DialogTitle__default.default, { id: "confirm-dialog-title" }, title),
    /* @__PURE__ */ React__default.default.createElement(DialogContent__default.default, null, /* @__PURE__ */ React__default.default.createElement(DialogContentText__default.default, { id: "confirm-dialog-description" }, message)),
    /* @__PURE__ */ React__default.default.createElement(DialogActions__default.default, null, /* @__PURE__ */ React__default.default.createElement(Button3__default.default, { onClick: onCancel, color: "primary" }, "Cancel"), /* @__PURE__ */ React__default.default.createElement(Button3__default.default, { onClick: onConfirm, color: "primary", variant: "contained", autoFocus: true }, "Confirm"))
  );
};
var ConfirmDialog_default = ConfirmDialog;
var EditorPanel = () => {
  return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { px: 2, py: 1 } }, /* @__PURE__ */ React__default.default.createElement(Router, null));
};
var NavigationPanel = () => {
  const { dataset, expandedNodes, setExpandedNodes, setSelectedNode } = useLiPDStore((state) => ({
    dataset: state.dataset,
    expandedNodes: state.expandedNodes,
    setExpandedNodes: state.setExpandedNodes,
    setSelectedNode: state.setSelectedNode
  }));
  if (!dataset) {
    return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { p: 2, textAlign: "center" } }, /* @__PURE__ */ React__default.default.createElement(material.CircularProgress, null));
  }
  let workingDataset = dataset;
  if (!(workingDataset instanceof lipdjs.Dataset)) {
    workingDataset = lipdjs.Dataset.fromDictionary(workingDataset);
  }
  const handleNodeToggle = (event, nodeIds) => {
    setExpandedNodes(new Set(nodeIds));
  };
  const handleNodeSelect = (event, itemIds) => {
    if (Array.isArray(itemIds)) {
      setSelectedNode(itemIds[0] || "");
    } else {
      setSelectedNode(itemIds);
    }
  };
  const renderPaleoDataTree = () => {
    return /* @__PURE__ */ React__default.default.createElement(TreeItem$1.TreeItem, { itemId: "dataset.paleoData", label: "PaleoData" }, workingDataset.getPaleoData()?.map((paleoData, paleoIndex) => {
      const paleoNodeId = `dataset.paleoData.${paleoIndex}`;
      return /* @__PURE__ */ React__default.default.createElement(TreeItem$1.TreeItem, { key: paleoNodeId, itemId: paleoNodeId, label: paleoData.getName() || `PaleoData ${paleoIndex + 1}` }, paleoData.getMeasurementTables()?.map((table, tableIndex) => {
        const tableNodeId = `dataset.paleoData.${paleoIndex}.measurementTables.${tableIndex}`;
        return /* @__PURE__ */ React__default.default.createElement(
          TreeItem$1.TreeItem,
          {
            key: tableNodeId,
            itemId: tableNodeId,
            label: table.getFileName() || `Table ${tableIndex + 1}`
          }
        );
      }));
    }));
  };
  const renderChronDataTree = () => {
    return /* @__PURE__ */ React__default.default.createElement(TreeItem$1.TreeItem, { itemId: "dataset.chronData", label: "ChronData" }, workingDataset.getChronData()?.map((chronData, chronIndex) => {
      const chronNodeId = `dataset.chronData.${chronIndex}`;
      return /* @__PURE__ */ React__default.default.createElement(TreeItem$1.TreeItem, { key: chronNodeId, itemId: chronNodeId, label: `ChronData ${chronIndex + 1}` }, chronData.getMeasurementTables()?.map((table, tableIndex) => {
        const tableNodeId = `dataset.chronData.${chronIndex}.measurementTables.${tableIndex}`;
        return /* @__PURE__ */ React__default.default.createElement(
          TreeItem$1.TreeItem,
          {
            key: tableNodeId,
            itemId: tableNodeId,
            label: table.getFileName() || `Table ${tableIndex + 1}`
          }
        );
      }));
    }));
  };
  const renderPublicationsTree = () => {
    return /* @__PURE__ */ React__default.default.createElement(TreeItem$1.TreeItem, { itemId: "dataset.publications", label: "Publications" }, workingDataset.getPublications()?.map((publication, index) => {
      const pubNodeId = `dataset.publications.${index}`;
      return /* @__PURE__ */ React__default.default.createElement(
        TreeItem$1.TreeItem,
        {
          key: pubNodeId,
          itemId: pubNodeId,
          label: publication.getTitle() || `Publication ${index + 1}`
        }
      );
    }));
  };
  return /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { p: 2 } }, /* @__PURE__ */ React__default.default.createElement(
    SimpleTreeView.SimpleTreeView,
    {
      "aria-label": "dataset navigation",
      expandedItems: Array.from(expandedNodes),
      onExpandedItemsChange: handleNodeToggle,
      onSelectedItemsChange: handleNodeSelect,
      sx: { height: "100%", flexGrow: 1, maxWidth: 400, overflowY: "auto" }
    },
    /* @__PURE__ */ React__default.default.createElement(TreeItem$1.TreeItem, { itemId: "dataset", label: "Dataset" }, /* @__PURE__ */ React__default.default.createElement(
      TreeItem$1.TreeItem,
      {
        itemId: "dataset.location",
        label: "Location"
      }
    ), renderPaleoDataTree(), renderChronDataTree(), renderPublicationsTree(), /* @__PURE__ */ React__default.default.createElement(
      TreeItem$1.TreeItem,
      {
        itemId: "dataset.changeLogs",
        label: "ChangeLogs"
      }
    ))
  ));
};
var PaleoDataTree = ({ dataset }) => {
  const { expandedNodes } = useLiPDStore((state) => ({
    expandedNodes: state.expandedNodes
  }));
  return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, null, /* @__PURE__ */ React__default.default.createElement(
    TreeItem_default,
    {
      node: dataset,
      label: "PaleoData",
      nodeId: "paleoData",
      hasChildren: true
    }
  ), expandedNodes.has("paleoData") && dataset.getPaleoData()?.map((paleoData, paleoIndex) => {
    const paleoNodeId = `paleoData.${paleoIndex}`;
    const hasChildren = paleoData.getMeasurementTables() && paleoData.getMeasurementTables().length > 0;
    return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, { key: paleoNodeId }, /* @__PURE__ */ React__default.default.createElement(
      TreeItem_default,
      {
        node: paleoData,
        label: paleoData.getName() || `PaleoData ${paleoIndex + 1}`,
        nodeId: paleoNodeId,
        hasChildren,
        level: 1
      }
    ), expandedNodes.has(paleoNodeId) && hasChildren && paleoData.getMeasurementTables()?.map((table, tableIndex) => {
      const tableNodeId = `paleoData.${paleoIndex}.measurementTables.${tableIndex}`;
      return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, { key: tableNodeId }, /* @__PURE__ */ React__default.default.createElement(
        TreeItem_default,
        {
          node: table,
          label: table.getFileName() || `Table ${tableIndex + 1}`,
          nodeId: tableNodeId,
          hasChildren: false,
          level: 2
        }
      ));
    }));
  }));
};
var PaleoDataTree_default = PaleoDataTree;
var PublicationsTree = ({ dataset }) => {
  const { expandedNodes } = useLiPDStore((state) => ({
    expandedNodes: state.expandedNodes
  }));
  return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, null, /* @__PURE__ */ React__default.default.createElement(
    TreeItem_default,
    {
      node: dataset,
      label: "Publications",
      nodeId: "publications",
      hasChildren: false
    }
  ), expandedNodes.has("publications") && dataset.getPublications()?.map((publication, index) => {
    const pubNodeId = `publications.${index}`;
    return /* @__PURE__ */ React__default.default.createElement(
      TreeItem_default,
      {
        key: pubNodeId,
        node: publication,
        label: publication.getTitle() || `Publication ${index + 1}`,
        nodeId: pubNodeId,
        hasChildren: false,
        level: 1
      }
    );
  }));
};
var PublicationsTree_default = PublicationsTree;
var SyncProgressBar = () => {
  const { isSyncing, syncProgress } = useLiPDStore((state) => ({
    isSyncing: state.isSyncing,
    syncProgress: state.syncProgress || 0
  }));
  if (!isSyncing) {
    return null;
  }
  return /* @__PURE__ */ React__default.default.createElement(
    material.Box,
    {
      sx: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        bgcolor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    },
    /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "subtitle1", sx: { mb: 1 } }, "Syncing to GraphDB..."),
    /* @__PURE__ */ React__default.default.createElement(
      LinearProgress__default.default,
      {
        variant: "determinate",
        value: syncProgress,
        sx: {
          width: "80%",
          height: 10,
          borderRadius: 5,
          "& .MuiLinearProgress-bar": {
            backgroundColor: "primary.main"
          }
        }
      }
    ),
    /* @__PURE__ */ React__default.default.createElement(material.Typography, { variant: "caption", sx: { mt: 1 } }, syncProgress, "% Complete")
  );
};
var SyncProgressBar_default = SyncProgressBar;
var LiPDApp = () => {
  const {
    syncConfirmDialogOpen,
    setSyncConfirmDialogOpen,
    confirmSync
  } = useLiPDStore((state) => ({
    syncConfirmDialogOpen: state.syncConfirmDialogOpen,
    setSyncConfirmDialogOpen: state.setSyncConfirmDialogOpen,
    confirmSync: state.confirmSync
  }));
  const handleSyncConfirm = () => {
    confirmSync();
  };
  const handleSyncCancel = () => {
    setSyncConfirmDialogOpen(false);
  };
  return /* @__PURE__ */ React__default.default.createElement("div", null, /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { px: 2, py: 1 } }, /* @__PURE__ */ React__default.default.createElement(AppBarBreadcrumbs_default, null)), /* @__PURE__ */ React__default.default.createElement(material.Divider, null), /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: { display: "flex", height: "100%" } }, /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: {
    width: 300,
    flexShrink: 0,
    borderRight: 1,
    borderColor: "divider",
    overflow: "auto"
  } }, /* @__PURE__ */ React__default.default.createElement(NavigationPanel, null)), /* @__PURE__ */ React__default.default.createElement(material.Box, { sx: {
    flex: 1,
    overflow: "auto",
    p: 2
  } }, /* @__PURE__ */ React__default.default.createElement(Router, null))), /* @__PURE__ */ React__default.default.createElement(
    ConfirmDialog_default,
    {
      open: syncConfirmDialogOpen,
      title: "Sync to GraphDB",
      message: "Are you sure you want to sync this dataset to GraphDB? This action will update the remote database and requires authentication credentials.",
      onConfirm: handleSyncConfirm,
      onCancel: handleSyncCancel
    }
  ));
};

exports.AddIcon = AddIcon;
exports.AppBarActions = AppBarActions_default;
exports.AppBarBreadcrumbs = AppBarBreadcrumbs_default;
exports.ArrowBackIcon = ArrowBackIcon;
exports.ArticleIcon = ArticleIcon;
exports.CheckIcon = CheckIcon;
exports.ChevronRightIcon = ChevronRightIcon;
exports.ChronDataTree = ChronDataTree_default;
exports.ConfirmDialog = ConfirmDialog_default;
exports.DataTableEditor = DataTableEditor;
exports.DefaultEditor = DefaultEditor;
exports.DefaultEnumEditor = DefaultEnumEditor;
exports.DefaultListEditor = DefaultListEditor;
exports.DeleteIcon = DeleteIcon;
exports.DescriptionIcon = DescriptionIcon;
exports.EditIcon = EditIcon;
exports.EditorPanel = EditorPanel;
exports.ExpandMoreIcon = ExpandMoreIcon;
exports.Fieldset = Fieldset;
exports.FileDownloadIcon = FileDownloadIcon;
exports.FileUploadIcon = FileUploadIcon;
exports.FolderIcon = FolderIcon;
exports.FormTextField = FormTextField;
exports.HomeIcon = HomeIcon;
exports.LiPDApp = LiPDApp;
exports.ListView = ListView_default;
exports.NavigateNextIcon = NavigateNextIcon;
exports.NavigationPanel = NavigationPanel;
exports.PaleoDataTree = PaleoDataTree_default;
exports.PublicationsTree = PublicationsTree_default;
exports.RedoIcon = RedoIcon;
exports.Router = Router;
exports.RouterProvider = RouterProvider;
exports.SaveAsIcon = SaveAsIcon;
exports.SaveIcon = SaveIcon;
exports.SyncIcon = SyncIcon;
exports.SyncProgressBar = SyncProgressBar_default;
exports.TableChartIcon = TableChartIcon;
exports.TableRowsIcon = TableRowsIcon;
exports.TreeItem = TreeItem_default;
exports.UndoIcon = UndoIcon;
exports.archiveTypeSchema = archiveTypeSchema;
exports.calibrationSchema = calibrationSchema;
exports.changeLogEntrySchema = changeLogEntrySchema;
exports.changeLogSchema = changeLogSchema;
exports.compilationSchema = compilationSchema;
exports.dataSchema = dataSchema;
exports.dataTableSchema = dataTableSchema;
exports.datasetSchema = datasetSchema;
exports.fundingSchema = fundingSchema;
exports.getChangeLogCuratorLabel = getChangeLogCuratorLabel;
exports.getChangeLogEntryLabel = getChangeLogEntryLabel;
exports.getChangeLogLabel = getChangeLogLabel;
exports.getCompilationNameLabel = getCompilationNameLabel;
exports.getDataDetailsLabel = getDataDetailsLabel;
exports.getDataTableLabel = getDataTableLabel;
exports.getDataTableVariablesLabel = getDataTableVariablesLabel;
exports.getFundingGrantsLabel = getFundingGrantsLabel;
exports.getFundingLabel = getFundingLabel;
exports.getMeasurementTablesLabel = getMeasurementTablesLabel;
exports.getModeledByLabel = getModeledByLabel;
exports.getPersonNameLabel = getPersonNameLabel;
exports.getPublicationAuthorsLabel = getPublicationAuthorsLabel;
exports.getPublicationFullLabel = getPublicationFullLabel;
exports.getPublicationTitleLabel = getPublicationTitleLabel;
exports.getSchemaForPath = getSchemaForPath;
exports.getVariableDescriptionLabel = getVariableDescriptionLabel;
exports.getVariableNameLabel = getVariableNameLabel;
exports.getVariableUnitsLabel = getVariableUnitsLabel;
exports.interpretationSchema = interpretationSchema;
exports.interpretationVariableSchema = interpretationVariableSchema;
exports.locationSchema = locationSchema;
exports.modelSchema = modelSchema;
exports.paleoUnitSchema = paleoUnitSchema;
exports.paleoVariableSchema = paleoVariableSchema;
exports.personSchema = personSchema;
exports.proxyGeneralSchema = proxyGeneralSchema;
exports.proxySchema = proxySchema;
exports.publicationSchema = publicationSchema;
exports.resolutionSchema = resolutionSchema;
exports.seasonalityGeneralSchema = seasonalityGeneralSchema;
exports.seasonalityOriginalSchema = seasonalityOriginalSchema;
exports.seasonalitySchema = seasonalitySchema;
exports.useLiPDStore = useLiPDStore;
exports.useRouter = useRouter;
exports.variableSchema = variableSchema;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map