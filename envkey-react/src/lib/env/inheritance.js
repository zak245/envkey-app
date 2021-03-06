import R from 'ramda'

export const
  inheritedShallow = ({entryKey, inherits, envsWithMeta})=> envsWithMeta[inherits][entryKey],

  inheritedDeep = ({entryKey, inherits, envsWithMeta})=>{
    let inherited = inheritedShallow({entryKey, inherits, envsWithMeta})
    while (true){
      if(inherited.inherits){
        inherited = inheritedShallow({entryKey, envsWithMeta, inherits: inherited.inherits})
      } else {
        return inherited
      }
    }
  },

  inheritedVal = props=> inheritedDeep(props).val,

  productionInheritanceOverrides = envsWithMeta => R.pipe(
    R.propOr({}, "production"),

    R.filter(({inherits, locked})=> inherits && locked),

    R.mapObjIndexed(({inherits}, entryKey)=> inheritedVal({inherits, entryKey, envsWithMeta}))
  )(envsWithMeta)