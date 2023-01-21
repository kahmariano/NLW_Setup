import { ActivityIndicator, View } from 'react-native'

export function Loading() {
  //componente de loading para nao ficar uma tela sem nada quando esta iniciando app
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#09090A'
      }}
    >
      <ActivityIndicator color="#7C3AED" />
    </View>
  )
}
