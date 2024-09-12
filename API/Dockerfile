FROM mcr.microsoft.com/dotnet/sdk:7.0 as build-env
WORKDIR /api
COPY ./*.csproj .
RUN dotnet restore
COPY . .
# RUN dotnet publish -c Release -o /publish

# FROM mcr.microsoft.com/dotnet/aspnet:7.0 as runtime
# WORKDIR /publish
# COPY --from=build-env /publish .
# EXPOSE 5000
# ENTRYPOINT ["dotnet", "api.dll"]
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5000"]