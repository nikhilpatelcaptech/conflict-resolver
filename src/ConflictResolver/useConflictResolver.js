// src/ConflictResolver/useConflictResolver.js
import { useState, useMemo } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

function pointerToSegments(pointer) {
  if (!pointer) return [];
  return pointer.split('/').filter(Boolean);
}

/**
 * Apply a value at a JSON-pointer-like path onto both:
 *  - workingDraft._blocksByName.<blockName>...
 *  - workingDraft.blocks[blockIndex]...
 */
// function applyValueAtPointer(draft, pointer, value) {
//   const segments = pointerToSegments(pointer);
//   if (segments.length === 0) return;

//   // Apply to the path exactly as in the pointer
//   const fullPath = segments.join('.');
//   set(draft, fullPath, value);

//   // If path starts with /_blocksByName/<blockId>/..., mirror into blocks[]
//   if (segments[0] === '_blocksByName' && segments.length > 2 && Array.isArray(draft.blocks)) {
//     const blockId = segments[1];
//     const restPath = segments.slice(2).join('.');

//     const idx = draft.blocks.findIndex(
//       (b) => b.blockId === blockId || b.nodeId === blockId
//     );

//     if (idx !== -1) {
//       set(draft.blocks[idx], restPath, value);
//     }
//   }
// }
function applyValueAtPointer(draft, pointer, value) {
  const segments = pointerToSegments(pointer);
  if (segments.length === 0) return;

  // 1️⃣ Apply to the exact path (works for all conflicts)
  const fullPath = segments.join('.');
  set(draft, fullPath, value);

  // 2️⃣ Mirror /_blocksByName/<blockName>/... into blocks[]
  if (segments[0] === '_blocksByName' && segments.length > 2 && Array.isArray(draft.blocks)) {
    const blockName = segments[1];
    const restPath = segments.slice(2).join('.');

    const idx = draft.blocks.findIndex(
      (b) => b.name === blockName
    );

    if (idx !== -1) {
      set(draft.blocks[idx], restPath, value);
    }
  }

  // 3️⃣ SPECIAL CASE: relation conflicts under _relationsByName
  //
  // Path shape: /_blocksByName/<blockName>/_relationsByName/<relationName>[/...field...]
  // - 4 segments: replacing entire relation object
  // - 5+ segments: updating a field within the relation
  if (
    segments[0] === '_blocksByName' &&
    segments[2] === '_relationsByName' &&
    segments.length >= 4
  ) {
    const blockName = segments[1];
    const relationName = segments[3];
    const hasFieldPath = segments.length >= 5;
    const fieldPathFromRelation = hasFieldPath ? segments.slice(4).join('.') : null;

    // Helper to update relation in a relations[] array
    const updateRelationInArray = (relationsArray) => {
      if (!Array.isArray(relationsArray)) return;
      
      // First, try to find by relationId or name (for object entries)
      let relIdx = relationsArray.findIndex(
        (r) => r && typeof r === 'object' && (r.relationId === relationName || r.name === relationName)
      );
      
      // If not found, look for conflict marker strings
      // The resolved value should have name or relationId matching relationName
      if (relIdx === -1 && !hasFieldPath) {
        // Look for any conflict marker string entry
        relIdx = relationsArray.findIndex(
          (r) => typeof r === 'string' && r.includes('@@CONFLICT{')
        );
      }
      
      if (relIdx !== -1) {
        if (hasFieldPath) {
          // Update a field within the relation
          set(relationsArray[relIdx], fieldPathFromRelation, value);
        } else {
          // Replace the entire relation object
          relationsArray[relIdx] = value;
        }
      }
    };

    // 3a) Update _blocksByName.<blockName>.relations[]
    const blockByName =
      draft._blocksByName && draft._blocksByName[blockName]
        ? draft._blocksByName[blockName]
        : null;

    if (blockByName) {
      updateRelationInArray(blockByName.relations);
    }

    // 3b) Update blocks[].relations[]
    if (Array.isArray(draft.blocks)) {
      const idx = draft.blocks.findIndex(
        (b) => b.name === blockName
      );
      if (idx !== -1) {
        updateRelationInArray(draft.blocks[idx].relations);
      }
    }
  }
}


export default function useConflictResolver(data) {
  const [workingDraft, setWorkingDraft] = useState(() =>
    cloneDeep(data.workingObject)
  );

  const [resolutions, setResolutions] = useState({});

  const conflicts = data.conflicts || [];

  const conflictById = useMemo(() => {
    const map = {};
    conflicts.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [conflicts]);

  const applyResolution = (id, choice, customValue) => {
    const conflict = conflictById[id];
    if (!conflict) return;

    let resolvedValue;
    if (choice === 'current') {
      resolvedValue = conflict.current;
    } else if (choice === 'incoming') {
      resolvedValue = conflict.incoming;
    } else if (choice === 'custom') {
      resolvedValue = customValue;
    } else {
      return;
    }

    // remember resolution choice
    setResolutions((prev) => ({
      ...prev,
      [id]: { choice, value: resolvedValue },
    }));

    // update workingDraft (both _blocksByName & blocks[])
    setWorkingDraft((prev) => {
      const draft = cloneDeep(prev);
      applyValueAtPointer(draft, conflict.path, resolvedValue);
      return draft;
    });
  };

  const isResolved = (id) => !!resolutions[id];

  const allResolved =
    conflicts.length > 0 && conflicts.every((c) => !!resolutions[c.id]);

  return {
    workingDraft,
    conflicts,
    applyResolution,
    isResolved,
    allResolved,
  };
}
