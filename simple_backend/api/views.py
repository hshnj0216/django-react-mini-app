from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from .models import Note

# Create your views here.
"""
    API view to handle the creation of new users.
    
    This view uses the UserSerializer to validate and create user instances.
"""
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

"""
    API view to handle the creation of notes.
    
    This view uses the NoteSerializer to validate and create note instances.
"""

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

"""
    This view handles the deletion of notes.

    This view uses the NoteSerializer class to delete a note instance.
"""
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user=user)
