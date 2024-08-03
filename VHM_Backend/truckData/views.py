from rest_framework import viewsets
from .models import Truck
from .serializers import TruckSerializer

class TruckViewSet(viewsets.ModelViewSet):
    # Define the queryset that this view will operate on
    queryset = Truck.objects.all()
    
    # Specify the serializer class used to serialize and deserialize Truck instances
    serializer_class = TruckSerializer
