from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ai import predict_disease


@api_view(['POST'])
def predict(request):
    symptoms = request.data.get('symptoms')
    prediction_result = predict_disease.predict(symptoms)
    return Response({"status": "success", "prediction": prediction_result}, status.HTTP_200_OK)
