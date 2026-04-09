"""
Script para guardar las credenciales de IBM Quantum.
Solo necesitas ejecutarlo UNA VEZ.

1. Ve a https://quantum.ibm.com/
2. Inicia sesión con jose.bobal@gmail.com
3. Account Settings → API Token → Copy
4. Ejecuta: python configurar_ibm.py
"""
from qiskit_ibm_runtime import QiskitRuntimeService

token = input("Pega tu IBM Quantum API Token aquí: ").strip()

QiskitRuntimeService.save_account(
    channel="ibm_quantum",
    token=token,
    overwrite=True,
)
print("\n✅ Token guardado correctamente.")
print("Verifica con: from qiskit_ibm_runtime import QiskitRuntimeService; QiskitRuntimeService()")
