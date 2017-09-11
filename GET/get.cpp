#include<iostream>
#include<string>
#include<vector>
#include<fstream>
#include<sstream>
#include<cstdio>
using namespace std;


int main()
{
	//Read From *.csv
	ifstream inFile("data.csv",ios::in);
	string lineStr;
	vector< vector<string> > strArray;
	while(getline(inFile,lineStr))
	{
		//cout << lineStr << endl;
		stringstream ss(lineStr);
		string str;
		vector<string> lineArray;
		while(getline(ss,str,','))
			lineArray.push_back(str);
		strArray.push_back(lineArray);
	}
	//cout<<strArray.size()<<endl;
	//Analyze
	for(int i=1;i<strArray.size();i++)
	{
		vector<string> line = strArray[i];
		string Submit = line[0];
		bool isSubmit =false;
		if(Submit[0]=='t')
			isSubmit=true;
		string Pai = line[1];
		string stuNumber = line[2];
		string fileURL = line[3];
		string Ban = line[6];	
		string Title = line[7];

		char URL[300],Name[300];
		strcpy(URL, fileURL.c_str());
		strcpy(Name, Title.c_str());
		//cout<<URL<<" "<<Name<<endl;
		if(isSubmit)
		{
			char op[300];
			int dir=0;
			system("mkdir 1");
			system("mkdir 2");
			system("mkdir 3");
			system("mkdir 4");
			system("mkdir 5");
			system("mkdir 6");
			dir=int(Ban[0]-'0');

			sprintf(op,"wget -O %d/\"%s\" %s",dir,Name,URL);
			//cout<<op<<endl;
			system(op);
		}
	}
	return 0;

}